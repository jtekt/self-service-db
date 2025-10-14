"use server";

import { redirect } from "next/navigation";
import { login, register } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/sessions";
import { getUserIdByName } from "@/lib//databases";
import z from "zod";

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

export async function createUserAction(state: any, values: Credentials) {
  try {
    const { username, password } = credentialsSchema.parse(values);
    await register(username, password);
    const userId = await getUserIdByName(username);
    await createSession(userId);
  } catch (error: any) {
    return { error: error.message };
  }

  return redirect("/databases");
}

export async function loginAction(state: any, values: Credentials) {
  const { username, password } = values;
  try {
    await login(username, password);
    const userId = await getUserIdByName(username);
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
