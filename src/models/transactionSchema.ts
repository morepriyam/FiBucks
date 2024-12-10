import * as z from "zod";

// Transaction Validation Schema
export const transactionSchema = z.object({
  type: z.enum(["income", "expense", "transfer"], {
    required_error: "Transaction type is required",
  }),
  category: z.string().min(1, { message: "Category is required" }),
  amount: z.number().positive("Amount must be positive"),
  date: z.string().min(1, { message: "Date is required" }),
  description: z.string().optional(),
});

export type TransactionType = z.infer<typeof transactionSchema> & {
  _id: string; // Add the MongoDB _id type
};
