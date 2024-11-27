import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value || "";
  const refreshToken = req.cookies.get("refreshToken")?.value || "";

  const isAccessTokenValid = verifyToken(accessToken, ACCESS_TOKEN_SECRET);

  if (isAccessTokenValid) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const isRefreshTokenValid = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);

    if (isRefreshTokenValid) {
      const userId = (isRefreshTokenValid as jwt.JwtPayload).userId;
      const newAccessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return response;
    }
  }

  const loginUrl = new URL("/login", req.nextUrl.origin);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher:
    "/((?!api/verify|api/users/signup|signup|login|api/users/login|$).*)",
};
