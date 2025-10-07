"use server";

import { redirect } from "next/navigation";
import { login, register } from "../auth";
import { createSession, deleteSession } from "../sessions";
import { getUserIdByName } from "../databases";
import z from "zod";

export async function loginAction(username: string, password: string) {
  await login(username, password);

  const userId = await getUserIdByName(username);

  await createSession(userId);

  redirect("/databases");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function createUserAction(
  values: z.infer<typeof createUserSchema>
) {
  const { username, password } = createUserSchema.parse(values);

  await register(username, password);

  const userId = await getUserIdByName(username);

  await createSession(userId);

  redirect("/databases");
}
