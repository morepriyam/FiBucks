import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { TransactionType } from "@/models/transactionSchema";

interface TransactionChartProps {
  transactions: TransactionType[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({
  transactions,
}) => {
  const chartData = transactions.map((tx) => ({
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount,
    type: tx.type,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionChart;
