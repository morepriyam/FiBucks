import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
