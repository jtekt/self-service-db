"use server";

import { redirect } from "next/navigation";
import { login, register } from "../auth";
import { createSession, deleteSession } from "../sessions";
import { getUserIdByName } from "../databases";

export async function loginAction(state: any, formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username) return { error: "Missing username" };
  if (!password) return { error: "Missing password" };

  try {
    await login(username, password);

    const userId = await getUserIdByName(username);

    await createSession(userId);
  } catch (error) {
    console.log(error);
    return {
      error: "Login failed",
    };
  }

  redirect("/databases");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

export async function createUserAction(state: any, formData: FormData) {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const passwordConfirm = formData.get("passwordConfirm")?.toString();

  if (!username) return { error: "Missing username" };
  if (!password) return { error: "Missing password" };
  if (!passwordConfirm) return { error: "Missing passwordConfirm" };

  if (passwordConfirm !== password)
    return { error: "Password confirm does not match" };

  try {
    await register(username, password);

    const userId = await getUserIdByName(username);

    await createSession(userId);
  } catch (error) {
    console.log(error);
    return {
      error: "Registration failed",
    };
  }

  redirect("/databases");
}
