"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true },
      );
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      form.reset();

      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: "Error",
          description: error.response.data.error || "Login failed.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <DollarSign className="mx-auto h-12 w-12" />
            <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back to FiBucks - manage your finances with ease
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full"
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
