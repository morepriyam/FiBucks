import React from "react";
import { TransactionType } from "@/models/transactionSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TransactionListProps {
  transactions: TransactionType[];
  onEdit: (transaction: TransactionType) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Transactions</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {transactions.map((tx) => (
          <Card
            key={tx._id}
            className="transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{tx.category}</span>
                <span
                  className={`text-sm font-normal ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}
                >
                  {tx.type}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-2xl font-bold">
                ${tx.amount.toLocaleString()}
              </p>
              <p className="mb-2 text-sm text-gray-500">
                {new Date(tx.date).toLocaleDateString()}
              </p>
              <p className="mb-4 text-sm">{tx.description || "N/A"}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(tx)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(tx._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
