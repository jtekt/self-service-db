"use client";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { LogOut } from "lucide-react";

type Props = {};

export function LogoutButton(props: PropsWithChildren<Props>) {
  return (
    <Button
      onClick={() => logoutAction()}
      variant="secondary"
      size="icon"
      className="size-8"
    >
      <LogOut />
    </Button>
  );
}
