"use server";

import { redirect } from "next/navigation";
import { login, register } from "../auth";
import { createSession, deleteSession } from "../sessions";
import { getUserIdByName } from "../databases";
import z from "zod";

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Credentials = z.infer<typeof credentialsSchema>;

export async function createUserAction(values: Credentials) {
  try {
    const { username, password } = credentialsSchema.parse(values);
    await register(username, password);
    const userId = await getUserIdByName(username);
    await createSession(userId);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function loginAction(username: string, password: string) {
  try {
    await login(username, password);
    const userId = await getUserIdByName(username);
    await createSession(userId);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
