"use server";
import { cache } from "react";
import { getUserIdFromSession } from "../sessions";
import {
  createDb,
  deleteDB,
  getDbOfUser,
  getDbsOfuser,
  getUserNameById,
} from "../databases";
import {
  DB_HOST,
  DB_PORT,
  NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME,
} from "@/config";

import { redirect } from "next/navigation";
import z from "zod";

export const getDatabasesCache = cache(async () => {
  const userId = await getUserIdFromSession();
  return await getDbsOfuser(userId as number);
});

export const getDatabaseCache = cache(async (dbName: string) => {
  const userId = await getUserIdFromSession();
  const username = await getUserNameById(userId as number);
  const db = await getDbOfUser(userId as number, dbName);

  return { username, db, host: DB_HOST, port: DB_PORT };
});

export const createDbAction = async (state: any, formData: FormData) => {
  // TODO: if doing validation here, then not needed in client
  const schema = z
    .string()
    .min(2, "Name is too short")
    .regex(/^[a-z0-9_-]+$/, "Invalid format");

  const { error, data: userProvidedDbName } = schema.safeParse(
    formData.get("database")
  );

  if (error) return { error: error.issues.at(0)?.message };

  return { error: "test error" };

  const userId = await getUserIdFromSession();
  const username = await getUserNameById(userId as number);

  const dbName = NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME
    ? `${username}-${userProvidedDbName}`
    : userProvidedDbName;

  try {
    await createDb(dbName, username);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  redirect(`/databases/${dbName}`);
};

export const deleteDbAction = async (dbName: string) => {
  const userId = await getUserIdFromSession();

  const db = await getDbOfUser(userId as number, dbName);
  if (!db)
    return {
      error: `${dbName} is not a DB of user ${userId}`,
    };

  try {
    await deleteDB(dbName);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  redirect("/databases");
};
