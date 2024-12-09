"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TransactionType, transactionSchema } from "@/models/transactionSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TransactionList from "@/components/global/TransactionList";
import TransactionChart from "@/components/global/TransactionChart";

const TransactionsDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<TransactionType>>({});
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/users/transactions", {
        withCredentials: true,
      });
      setTransactions(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch transactions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes with Type Conversion
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  // Handle Select Changes
  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add or Edit Transaction
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate Data with Zod
      const parsedData = transactionSchema.parse(formData);

      if (isEditing && formData._id) {
        await axios.put("/api/users/transactions", {
          transactionId: formData._id,
          ...parsedData,
        });
        toast({
          title: "Success",
          description: "Transaction updated successfully.",
        });
        setIsEditing(false);
      } else {
        await axios.post("/api/users/transactions", parsedData);
        toast({
          title: "Success",
          description: "Transaction added successfully.",
        });
      }

      setFormData({});
      fetchTransactions();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to save transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete Transaction
  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/users/transactions", {
        data: { transactionId: id },
        withCredentials: true,
      });
      toast({
        title: "Success",
        description: "Transaction deleted successfully.",
      });
      fetchTransactions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto space-y-8 p-6">
      <h1 className="text-4xl font-bold text-white">Transaction Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Transaction" : "Add Transaction"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  onValueChange={(value) => handleSelectChange(value, "type")}
                  value={formData.type || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Name</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  value={formData.amount || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              {isEditing ? "Update Transaction" : "Add Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <TransactionChart transactions={transactions} />

      <TransactionList
        transactions={transactions}
        onEdit={(tx) => {
          setFormData(tx);
          setIsEditing(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TransactionsDashboard;
