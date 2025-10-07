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

export const createDbAction = async (userProvidedDbName: string) => {
  // NOTE: this is no longer an action as used by a form's action attribute

  const userId = await getUserIdFromSession();
  const username = await getUserNameById(userId as number);

  const dbName = NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME
    ? `${username}-${userProvidedDbName}`
    : userProvidedDbName;

  await createDb(dbName, username);

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
