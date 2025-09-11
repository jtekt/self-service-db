"use client";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

type Props = {};

export function LogoutButton(props: PropsWithChildren<Props>) {
  return <Button onClick={() => logoutAction()}>Logout</Button>;
}
