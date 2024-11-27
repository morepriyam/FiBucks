"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { EmailVerificationStatus } from "./email-verification-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    if (!userId || !token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      hasRun.current = true;
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get("/api/verify", {
          params: { userId, token },
        });

        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          setStatus("success");
          setMessage("Email verified successfully!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        }
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err.response?.data?.error || "An unexpected error occurred.",
        );
      }
    };

    verifyEmail();
    hasRun.current = true;
  }, [userId, token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmailVerificationStatus status={status} message={message} />
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === "error" && (
            <Button onClick={() => router.push("/login")}>
              Return to Login
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
