"use client";
import { DollarSign, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check Authentication Status
  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/authcheck", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");

      // Redirect to login after successful logout
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigateToFeatures = () => {
    router.push("/#features");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Define protected routes where the user shouldn't see "Logout"
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify" ||
    pathname === "/";

  return (
    <header className="flex h-14 items-center bg-inherit px-4 lg:px-6">
      <a className="flex items-center justify-center" href="/">
        <DollarSign className="h-6 w-6" />
        <span className="sr-only">FiBucks</span>
      </a>

      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {!isAuthenticated || isAuthPage ? (
          <>
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              onClick={handleNavigateToFeatures}
            >
              Features
            </a>
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/login"
            >
              Signin
            </a>
          </>
        ) : isAuthenticated && !isAuthPage ? (
          <>
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/transactions"
            >
              Transactions
            </a>
            <a
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/financeinputs"
            >
              Input Data
            </a>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </>
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
