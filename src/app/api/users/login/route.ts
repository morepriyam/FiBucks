import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      message: "Hello from the API",
      success: true,
    });
  } catch (error) {
    console.error("Error getting data:", error);
  }
}
