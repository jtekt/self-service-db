import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { HelpCircle } from "lucide-react";
import { env } from "next-runtime-env";
import Link from "next/link";

type Props = {};

export function HelpLink(props: PropsWithChildren<Props>) {
  const helpUri = env("NEXT_PUBLIC_HELP_URL");

  return (
    <>
      {helpUri && (
        <Button variant="ghost" size="icon" className="size-8">
          <Link href={helpUri}>
            <HelpCircle />
          </Link>
        </Button>
      )}
    </>
  );
}
