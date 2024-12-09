"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";
import { FormSchema } from "@/models/financeSchema"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

const FiBucksDashboard: React.FC = () => {
  const [data, setData] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users/financeinput", {
        withCredentials: true,
      });
      setData(response.data as FormSchema);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data. Please try again.</div>;
  }

  const totalAssets = [
    ...data.depositoryAccounts,
    ...data.investments,
    ...data.realEstate,
    ...data.others,
  ].reduce((sum, item) => sum + parseInt(item.value || item.balance), 0);

  const totalLiabilities = [...data.creditCards, ...data.loans].reduce(
    (sum, item) => sum + parseInt(item.balance),
    0
  );

  const netWorth = totalAssets - totalLiabilities;

  const assetAllocation = [
    {
      name: "Depository",
      value: data.depositoryAccounts.reduce((sum, acc) => sum + parseInt(acc.balance), 0),
    },
    {
      name: "Investments",
      value: data.investments.reduce((sum, inv) => sum + parseInt(inv.value), 0),
    },
    {
      name: "Real Estate",
      value: data.realEstate.reduce((sum, re) => sum + parseInt(re.value), 0),
    },
    {
      name: "Others",
      value: data.others.reduce((sum, other) => sum + parseInt(other.value), 0),
    },
  ];

  const creditCardUsage = data.creditCards.map((card) => ({
    name: card.name,
    usage: (parseInt(card.balance) / parseInt(card.limit)) * 100,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${netWorth.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalAssets.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalLiabilities.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Card Usage</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creditCardUsage}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Cards</CardTitle>
        </CardHeader>
        <CardContent>
          {data.creditCards.map((card, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>{card.name} (*{card.lastFourDigits})</span>
                <span>${parseInt(card.balance).toLocaleString()} / ${parseInt(card.limit).toLocaleString()}</span>
              </div>
              <Progress value={(parseInt(card.balance) / parseInt(card.limit)) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Depository Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {data.depositoryAccounts.map((account, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{account.name}</span>
                <span>${parseInt(account.balance).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
          </CardHeader>
          <CardContent>
            {data.investments.map((investment, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{investment.name}</span>
                <span>${parseInt(investment.value).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loans</CardTitle>
          </CardHeader>
          <CardContent>
            {data.loans.map((loan, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{loan.name}</span>
                <span>${parseInt(loan.balance).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real Estate</CardTitle>
          </CardHeader>
          <CardContent>
            {data.realEstate.map((property, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{property.address}</span>
                <span>${parseInt(property.value).toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Other Assets</CardTitle>
        </CardHeader>
        <CardContent>
          {data.others.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>${parseInt(item.value).toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FiBucksDashboard;
