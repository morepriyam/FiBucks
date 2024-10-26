import User from "@/models/userModel";
import nodemailer, { Transporter } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// Define the types for the function's parameters
interface SendMailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: String;
}

export default async function sendMail({
  email,
  emailType,
  userId,
}: SendMailOptions) {
  try {
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: uuidv4(),
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: uuidv4(),
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport: Transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525, // 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const emailSubjects: Record<SendMailOptions["emailType"], string> = {
      VERIFY: "Verify your email",
      RESET: "Reset your password",
    };

    const emailContent: Record<SendMailOptions["emailType"], string> = {
      VERIFY: `
        <h1>Welcome!</h1>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify?userId=${userId}">Verify Email</a>
      `,
      RESET: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?userId=${userId}">Reset Password</a>
      `,
    };

    const mailOptions = {
      from: process.env.FROM_EMAIL || "no-reply@fibucks.com",
      to: email,
      subject: emailSubjects[emailType],
      text: `Hello! Please click the link provided to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.`,
      html: emailContent[emailType],
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
