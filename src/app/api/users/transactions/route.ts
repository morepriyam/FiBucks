import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";
import { transactionSchema } from "@/models/transactionSchema";
import * as z from "zod";

// Fetch all transactions
export async function GET(req: NextRequest) {
  await connect();
  const userId = req.headers.get("X-User-Id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add a new transaction
export async function POST(req: NextRequest) {
  await connect();

  const userId = req.headers.get("X-User-Id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    const parsedData = transactionSchema.parse(payload);

    const newTransaction = new Transaction({
      userId,
      ...parsedData,
      date: new Date(parsedData.date), // Ensure correct Date format
    });

    await newTransaction.save();
    return NextResponse.json(
      { message: "Transaction added successfully", success: true },
      { status: 201 },
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a transaction
export async function PUT(req: NextRequest) {
  await connect();

  const userId = req.headers.get("X-User-Id");
  const payload = await req.json();

  const schema = transactionSchema.extend({
    transactionId: z.string().min(1, "Transaction ID is required"),
  });

  const parsedData = schema.safeParse(payload);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsedData.error.errors },
      { status: 400 },
    );
  }

  const { transactionId, ...updateData } = parsedData.data;

  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userId },
      updateData,
      { new: true },
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Transaction updated successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a transaction
export async function DELETE(req: NextRequest) {
  await connect();

  const userId = req.headers.get("X-User-Id");
  const payload = await req.json();

  const schema = z.object({
    transactionId: z.string().min(1, "Transaction ID is required"),
  });

  const parsedData = schema.safeParse(payload);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsedData.error.errors },
      { status: 400 },
    );
  }

  const { transactionId } = parsedData.data;

  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId,
    });

    if (!deletedTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}