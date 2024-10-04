import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2,
  Bell,
  Calendar,
  PieChart,
  Smartphone,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Finances with FiBucks
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Your personal expense tracker for smarter financial decisions.
                  Set budgets, track expenses, and achieve your financial goals.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button>Get Started</Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-black sm:text-5xl">
              Key Features
            </h2>
            1a
            <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="w-full">
                <CardHeader>
                  <BarChart2 className="mb-2 h-8 w-8" />
                  <CardTitle>Expense Tracking</CardTitle>
                  <CardDescription>
                    Easily record and categorize your income and expenses.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <PieChart className="mb-2 h-8 w-8" />
                  <CardTitle>Visual Analytics</CardTitle>
                  <CardDescription>
                    Visualize your spending patterns with interactive charts.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Calendar className="mb-2 h-8 w-8" />
                  <CardTitle>Budget Setting</CardTitle>
                  <CardDescription>
                    Set and monitor monthly budgets to stay on track.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Smartphone className="mb-2 h-8 w-8" />
                  <CardTitle>Mobile Friendly</CardTitle>
                  <CardDescription>
                    Access your finances on-the-go with our mobile app.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Bell className="mb-2 h-8 w-8" />
                  <CardTitle>Smart Alerts</CardTitle>
                  <CardDescription>
                    Receive notifications for budget limits and financial
                    milestones.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <Users className="mb-2 h-8 w-8" />
                  <CardTitle>Secure Access</CardTitle>
                  <CardDescription>
                    Manage your financial data securely with user
                    authentication.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  About FiBucks
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  FiBucks is a full-stack web application built using the MERN
                  stack. Our mission is to help students manage their finances
                  efficiently and make informed decisions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Project Details</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-500 dark:text-gray-400">
                  <li>Due Date: 18th September 2024</li>
                  <li>Team Leader: Priyam Rajesh More</li>
                  <li>
                    Team Members: Priyam More, Amber Singh, Ruthu V Rao, Parth
                    Samir Dalvi
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
