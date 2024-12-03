"use client";

import { useState, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { formSchema, FormSchema } from "@/models/financeSchema";
import { FinanceTab } from "@/components/global/FinanceTab";
import { getIcon, getSummary } from "@/utils/financeUtils";
import axios from "axios";

const categories = [
  "credit-cards",
  "depository",
  "investments",
  "loans",
  "real-estate",
  "others",
] as const;

export default function FinanceInputPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof categories)[number]>("credit-cards");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creditCards: [],
      depositoryAccounts: [],
      investments: [],
      loans: [],
      realEstate: [],
      others: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/financeinput", {
          withCredentials: true,
        });
        if (response.status === 200) {
          form.reset(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [form]);

  const handleTabChange = (value: string) => {
    if (isEditing) {
      toast({
        title: "Cannot switch categories",
        description:
          "Please save or remove the current item before switching categories.",
        variant: "destructive",
      });
    } else if (categories.includes(value as (typeof categories)[number])) {
      setActiveTab(value as (typeof categories)[number]);
    }
  };

  const handleStateChange = useCallback((editing: boolean) => {
    setIsEditing(editing);
  }, []);

  const handleNext = () => {
    const currentIndex = categories.indexOf(activeTab);
    if (currentIndex < categories.length - 1) {
      setActiveTab(categories[currentIndex + 1]);
    }
  };

  async function onSubmit(values: FormSchema) {
    try {
      const response = await axios.post("/api/users/financeinput", values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast({
          title: "Form submitted successfully",
          description: "Your financial information has been saved.",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <main className="container mx-auto px-5 py-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="mx-auto w-full max-w-4xl">
            <CardHeader>
              <CardTitle>Finance Tracker</CardTitle>
              <CardDescription>
                Input your financial information to get started with your
                personalized finance tracker.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-10 grid w-full grid-cols-3 lg:mb-0 lg:grid-cols-6">
                  <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
                  <TabsTrigger value="depository">Depository</TabsTrigger>
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                  <TabsTrigger value="loans">Loans</TabsTrigger>
                  <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                  <TabsTrigger value="others">Others</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-cards">
                  <FinanceTab
                    form={form}
                    fieldName="creditCards"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                </TabsContent>
                <TabsContent value="depository">
                  <FinanceTab
                    form={form}
                    fieldName="depositoryAccounts"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                </TabsContent>
                <TabsContent value="investments">
                  <FinanceTab
                    form={form}
                    fieldName="investments"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                </TabsContent>
                <TabsContent value="loans">
                  <FinanceTab
                    form={form}
                    fieldName="loans"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                </TabsContent>
                <TabsContent value="real-estate">
                  <FinanceTab
                    form={form}
                    fieldName="realEstate"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                </TabsContent>
                <TabsContent value="others">
                  <FinanceTab
                    form={form}
                    fieldName="others"
                    getIcon={getIcon}
                    getSummary={getSummary}
                    onStateChange={handleStateChange}
                    onNext={handleNext}
                  />
                  {activeTab === "others" && (
                    <Button type="submit" className="mt-4 w-full">
                      Submit All
                    </Button>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}
