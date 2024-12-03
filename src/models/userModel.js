import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
      trim: true,
      lowercase: true,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
    creditCards: {
      type: Array,
      default: [],
    },
    depositoryAccounts: {
      type: Array,
      default: [],
    },
    investments: {
      type: Array,
      default: [],
    },
    loans: {
      type: Array,
      default: [],
    },
    realEstate: {
      type: Array,
      default: [],
    },
    others: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
