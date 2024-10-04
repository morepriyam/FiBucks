import { DollarSign } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <a className="flex items-center justify-center" href="/">
        <DollarSign className="h-6 w-6" />
        <span className="sr-only">FiBucks</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Features
        </a>
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Pricing
        </a>
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
