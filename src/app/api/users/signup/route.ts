import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import zod from "zod";
import bcrypt from "bcrypt";
import sendEmail from "@/lib/mailer";

const signupSchema = zod.object({
  username: zod.string().trim().min(1).max(20),
  password: zod.string().min(8).max(30),
  email: zod.string().email().max(35),
});

export async function POST(req: NextRequest) {
  await connect();
  try {
    const reqBody = await req.json();

    //input validation
    const success = signupSchema.safeParse(reqBody);
    if (success.error) {
      return NextResponse.json(
        { message: success.error.message },
        { status: 400 },
      );
    }
    const { email, password } = reqBody;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const dbUser = await User.create({
      ...reqBody,
      password: hashedPassword,
    });

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: dbUser._id.toString(),
    });

    console.log(dbUser);
    return NextResponse.json({
      message: "User Created",
      success: true,
      user: dbUser,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
