"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import {
  CreditCard,
  Landmark,
  TrendingUp,
  Banknote,
  Home,
  Package,
  Pencil,
} from "lucide-react";

const formSchema = z.object({
  creditCards: z.array(
    z.object({
      name: z.string().min(1, "Card name is required"),
      lastFourDigits: z.string().length(4, "Must be exactly 4 digits"),
      limit: z.string().min(1, "Limit is required"),
      balance: z.string().min(1, "Balance is required"),
    }),
  ),
  depositoryAccounts: z.array(
    z.object({
      name: z.string().min(1, "Account name is required"),
      balance: z.string().min(1, "Balance is required"),
    }),
  ),
  investments: z.array(
    z.object({
      name: z.string().min(1, "Investment name is required"),
      value: z.string().min(1, "Value is required"),
    }),
  ),
  loans: z.array(
    z.object({
      name: z.string().min(1, "Loan name is required"),
      balance: z.string().min(1, "Balance is required"),
      interestRate: z.string().min(1, "Interest rate is required"),
    }),
  ),
  realEstate: z.array(
    z.object({
      address: z.string().min(1, "Address is required"),
      value: z.string().min(1, "Value is required"),
      mortgage: z.string().optional(),
    }),
  ),
  others: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      value: z.string().min(1, "Value is required"),
    }),
  ),
});

export default function FinanceInputPage() {
  const [activeTab, setActiveTab] = useState("credit-cards");
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  const addField = (fieldName: string) => {
    const currentFields = form.getValues(fieldName as any);
    form.setValue(fieldName as any, [...currentFields, {}]);
    setEditingItem(`${fieldName}.${currentFields.length}`);
  };

  const removeField = (fieldName: string, index: number) => {
    const currentFields = form.getValues(fieldName as any);
    form.setValue(
      fieldName as any,
      currentFields.filter((_: any, i: number) => i !== index),
    );
    setEditingItem(null);
  };

  const saveItem = () => {
    setEditingItem(null);
  };

  const editItem = (key: string) => {
    setEditingItem(key);
  };

  const renderFields = (fieldName: string, fields: any[]) => {
    return fields.map((field, index) => {
      const key = `${fieldName}.${index}`;
      const isEditing = editingItem === key;

      if (!isEditing) {
        return (
          <Button
            key={index}
            variant="outline"
            className="mb-2 flex w-full justify-between p-4"
            onClick={() => editItem(key)}
          >
            <div className="flex items-center space-x-2">
              {getIcon(fieldName)}
              <span>{getSummary(fieldName, field)}</span>
            </div>
            <Pencil className="h-4 w-4" />
          </Button>
        );
      }

      return (
        <Card key={index} className="mb-4">
          <CardContent className="pt-6">
            {renderFormFields(fieldName, index)}
            <div className="mt-4 flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={saveItem}>
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeField(fieldName, index)}
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  const renderFormFields = (fieldName: string, index: number) => {
    switch (fieldName) {
      case "creditCards":
        return (
          <>
            <FormField
              control={form.control}
              name={`creditCards.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter card name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`creditCards.${index}.lastFourDigits`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last 4 Digits</FormLabel>
                  <FormControl>
                    <Input placeholder="1234" maxLength={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`creditCards.${index}.limit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limit</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter limit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`creditCards.${index}.balance`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter balance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "depositoryAccounts":
        return (
          <>
            <FormField
              control={form.control}
              name={`depositoryAccounts.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`depositoryAccounts.${index}.balance`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter balance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "investments":
        return (
          <>
            <FormField
              control={form.control}
              name={`investments.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter investment name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`investments.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "loans":
        return (
          <>
            <FormField
              control={form.control}
              name={`loans.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter loan name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`loans.${index}.balance`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter balance"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`loans.${index}.interestRate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter interest rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "realEstate":
        return (
          <>
            <FormField
              control={form.control}
              name={`realEstate.${index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`realEstate.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`realEstate.${index}.mortgage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mortgage (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter mortgage"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case "others":
        return (
          <>
            <FormField
              control={form.control}
              name={`others.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`others.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getIcon = (fieldName: string) => {
    switch (fieldName) {
      case "creditCards":
        return <CreditCard className="h-5 w-5" />;
      case "depositoryAccounts":
        return <Landmark className="h-5 w-5" />;
      case "investments":
        return <TrendingUp className="h-5 w-5" />;
      case "loans":
        return <Banknote className="h-5 w-5" />;
      case "realEstate":
        return <Home className="h-5 w-5" />;
      case "others":
        return <Package className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getSummary = (fieldName: string, field: any) => {
    switch (fieldName) {
      case "creditCards":
        return `${field.name} (*${field.lastFourDigits})`;
      case "depositoryAccounts":
        return `${field.name}: $${field.balance}`;
      case "investments":
        return `${field.name}: $${field.value}`;
      case "loans":
        return `${field.name}: $${field.balance} @ ${field.interestRate}%`;
      case "realEstate":
        return `${field.address}: $${field.value}`;
      case "others":
      default:
        return `${field.name}: $${field.value}`;
    }
  };

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
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-10 grid w-full grid-cols-3 lg:mb-0 lg:grid-cols-6">
                  <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
                  <TabsTrigger value="depository">Depository</TabsTrigger>
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                  <TabsTrigger value="loans">Loans</TabsTrigger>
                  <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                  <TabsTrigger value="others">Others</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-cards">
                  {renderFields("creditCards", form.watch("creditCards"))}
                  <Button
                    type="button"
                    onClick={() => addField("creditCards")}
                    className="mt-2"
                  >
                    Add Credit Card
                  </Button>
                </TabsContent>
                <TabsContent value="depository">
                  {renderFields(
                    "depositoryAccounts",
                    form.watch("depositoryAccounts"),
                  )}
                  <Button
                    type="button"
                    onClick={() => addField("depositoryAccounts")}
                    className="mt-2"
                  >
                    Add Depository Account
                  </Button>
                </TabsContent>
                <TabsContent value="investments">
                  {renderFields("investments", form.watch("investments"))}
                  <Button
                    type="button"
                    onClick={() => addField("investments")}
                    className="mt-2"
                  >
                    Add Investment
                  </Button>
                </TabsContent>
                <TabsContent value="loans">
                  {renderFields("loans", form.watch("loans"))}
                  <Button
                    type="button"
                    onClick={() => addField("loans")}
                    className="mt-2"
                  >
                    Add Loan
                  </Button>
                </TabsContent>
                <TabsContent value="real-estate">
                  {renderFields("realEstate", form.watch("realEstate"))}
                  <Button
                    type="button"
                    onClick={() => addField("realEstate")}
                    className="mt-2"
                  >
                    Add Real Estate
                  </Button>
                </TabsContent>
                <TabsContent value="others">
                  {renderFields("others", form.watch("others"))}
                  <Button
                    type="button"
                    onClick={() => addField("others")}
                    className="mt-2"
                  >
                    Add Other
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
