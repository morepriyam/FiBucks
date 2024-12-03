import * as z from "zod";

export const formSchema = z.object({
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

export type FormSchema = z.infer<typeof formSchema>;
