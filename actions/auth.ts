"use server";

import { redirect } from "next/navigation";
import { Credentials, login, register } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/sessions";
import { getUserIdByName } from "@/lib//databases";

export async function createUserAction(state: any, credentials: Credentials) {
  try {
    await register(credentials);
    const userId = await getUserIdByName(credentials.username);
    await createSession(userId);
  } catch (error: any) {
    return { error: error.message };
  }

  return redirect("/databases");
}

export async function loginAction(state: any, credentials: Credentials) {
  try {
    await login(credentials);
    const userId = await getUserIdByName(credentials.username);
    await createSession(userId);
  } catch (error: any) {
    return { error: error.message };
  }

  return redirect("/databases");
}

export async function logoutAction(state: any) {
  await deleteSession();
  redirect("/login");
}
