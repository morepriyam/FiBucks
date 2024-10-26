import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <DollarSign className="mx-auto h-12 w-12" />
            <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to start managing your finances with FiBucks
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full"
                  placeholder="Name"
                />
              </div>
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
                  autoComplete="new-password"
                  required
                  className="w-full"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium underline-offset-4 hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
