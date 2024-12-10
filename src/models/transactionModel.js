import mongoose from "mongoose";

// Mongoose Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "transfer"],
      required: true,
    },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    description: { type: String, trim: true },
  },
  { timestamps: true },
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
