import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT, JWTPayload } from "jose";

// Extend JWTPayload to include the expected `userId` field
interface TokenPayload extends JWTPayload {
  userId: string;
}

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!,
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET!,
);

async function verifyToken(
  token: string,
  secret: Uint8Array,
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.userId === "string") {
      return payload as TokenPayload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value || "";
  const refreshToken = req.cookies.get("refreshToken")?.value || "";
  let userId: string | null = null;

  // Verify Access Token
  const accessTokenPayload = await verifyToken(
    accessToken,
    ACCESS_TOKEN_SECRET,
  );
  if (accessTokenPayload) {
    userId = accessTokenPayload.userId;
  }

  // Verify Refresh Token if Access Token is Invalid
  if (!userId && refreshToken) {
    const refreshTokenPayload = await verifyToken(
      refreshToken,
      REFRESH_TOKEN_SECRET,
    );
    if (refreshTokenPayload) {
      userId = refreshTokenPayload.userId;

      if (userId) {
        const newAccessToken = await new SignJWT({ userId })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("15m")
          .sign(ACCESS_TOKEN_SECRET);

        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        response.headers.set("X-User-Id", userId);
        return response;
      }
    }
  }

  // Unauthorized
  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Authorized
  const response = NextResponse.next();
  response.headers.set("X-User-Id", userId);
  return response;
}

export const config = {
  matcher: [
    "/((?!api/verify|api/users/signup|signup|login|api/users/login|favicon.ico|_next/|static/|verify|$).*)",
  ],
};
