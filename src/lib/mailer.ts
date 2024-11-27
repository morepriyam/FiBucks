import User from "@/models/userModel";
import nodemailer, { Transporter } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

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
  const token = uuidv4();
  try {
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport: Transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
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
        <h1>Welcome to FiBucks!</h1>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify?userId=${userId}&token=${token}">Verify Email</a>
      `,
      RESET: `
        <h1>Password Reset! FiBucks.com</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?userId=${userId}&token=${token}">Reset Password</a>
      `,
    };

    const mailOptions = {
      to: email,
      subject: emailSubjects[emailType],
      text: `Hello! Please click the link provided to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.`,
      html: emailContent[emailType],
    };

    console.log(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify?userId=${userId}&token=${token}`,
    );
    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
