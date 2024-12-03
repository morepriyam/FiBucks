import { connect } from "@/dbConfig/dbConfig";
import { formSchema } from "@/models/financeSchema";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connect();

  try {
    const userId = req.headers.get("X-User-Id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await User.findById(userId).select(
      "creditCards depositoryAccounts investments loans realEstate others",
    );

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user finance data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connect();

  try {
    const userId = req.headers.get("X-User-Id");
    console.log("userId", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await req.json();

    const parseResult = formSchema.safeParse(reqBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.errors },
        { status: 400 },
      );
    }

    const dbUser = await User.findById(userId);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validatedData = parseResult.data;

    dbUser.creditCards = validatedData.creditCards || dbUser.creditCards;
    dbUser.depositoryAccounts =
      validatedData.depositoryAccounts || dbUser.depositoryAccounts;
    dbUser.investments = validatedData.investments || dbUser.investments;
    dbUser.loans = validatedData.loans || dbUser.loans;
    dbUser.realEstate = validatedData.realEstate || dbUser.realEstate;
    dbUser.others = validatedData.others || dbUser.others;

    await dbUser.save();

    return NextResponse.json(
      { message: "Finance data updated successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating finance data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
