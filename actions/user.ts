"use server";
import { cache } from "react";
import { getUserIdFromSession } from "@/lib/sessions";
import { getUserNameById } from "@/lib/databases";

export const getUsernameCache = cache(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) throw new Error("No user ID");
  return await getUserNameById(userId as number);
});
