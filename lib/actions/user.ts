"use server";
import { cache } from "react";
import { getUserIdFromSession } from "../sessions";
import { getUserNameById } from "../databases";

export const getUsernameCache = cache(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) throw new Error("No user ID");
  return await getUserNameById(userId as number);
});
