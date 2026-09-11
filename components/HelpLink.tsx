import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { env } from "next-runtime-env";
import Link from "next/link";

export function HelpLink() {
  const helpUrl = env("NEXT_PUBLIC_HELP_URL");
  if (!helpUrl) return null;

  return (
    <Link href={helpUrl} target="_blank" rel="noreferrer">
      <Button variant="outline" size="icon">
        <HelpCircle />
        <span className="sr-only">Help</span>
      </Button>
    </Link>
  );
}
