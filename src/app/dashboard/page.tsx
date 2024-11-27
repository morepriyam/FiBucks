import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function FiBucksDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 py-6 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,567.89</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,210.45</div>
              <p className="text-xs text-muted-foreground">
                -1.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,357.44</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Grocery Store", amount: -75.5, date: "2023-06-15" },
                  { name: "Salary Deposit", amount: 3000, date: "2023-06-14" },
                  { name: "Electric Bill", amount: -120.3, date: "2023-06-13" },
                  {
                    name: "Online Shopping",
                    amount: -49.99,
                    date: "2023-06-12",
                  },
                  { name: "Restaurant", amount: -65.75, date: "2023-06-11" },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`${transaction.amount > 0 ? "text-green-500" : "text-red-500"} mr-4 h-4 w-4`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowUpRight />
                      ) : (
                        <ArrowDownRight />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <div
                      className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Your monthly budget breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { category: "Housing", spent: 1200, budget: 1500 },
                { category: "Food", spent: 450, budget: 500 },
                { category: "Transportation", spent: 200, budget: 300 },
                { category: "Entertainment", spent: 150, budget: 200 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {item.category}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.spent} / ${item.budget}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {Math.round((item.spent / item.budget) * 100)}%
                    </div>
                  </div>
                  <Progress value={(item.spent / item.budget) * 100} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
