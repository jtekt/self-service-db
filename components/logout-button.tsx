"use client";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { PropsWithChildren, startTransition, useActionState } from "react";
import { LogOut } from "lucide-react";

type Props = {};

export function LogoutButton(props: PropsWithChildren<Props>) {
  const [state, action, pending] = useActionState(logoutAction, null);

  function onClick() {
    startTransition(() => {
      action();
    });
  }
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="size-8"
      disabled={pending}
    >
      <LogOut />
    </Button>
  );
}
