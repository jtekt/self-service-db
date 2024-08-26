"use server"
import { cache } from "react"
import { getUserIdFromSession } from "../lib/sessions"
import {
  createDb,
  deleteDB,
  getDbOfUser,
  getDbsOfuser,
  getUserNameById,
} from "../lib/databases"
import { DB_HOST, DB_PORT } from "@/config"

import { redirect } from "next/navigation"

export const getDatabasesCache = cache(async () => {
  const userId = await getUserIdFromSession()
  return await getDbsOfuser(userId as number)
})

export const getDatabaseCache = cache(async (dbName: string) => {
  const userId = await getUserIdFromSession()
  const username = await getUserNameById(userId as number)
  const db = await getDbOfUser(userId as number, dbName)

  return { username, db, host: DB_HOST, port: DB_PORT }
})

export const createDbAction = async (state: any, formData: FormData) => {
  const dbName = formData.get("database")?.toString()

  if (!dbName) return { error: "Name not provided" }

  const userId = await getUserIdFromSession()
  const username = await getUserNameById(userId as number)

  try {
    await createDb(dbName, username)
  } catch (error: any) {
    return {
      error: error.message,
    }
  }

  redirect(`/databases/${dbName}`)
}

export const deleteDbAction = async (dbName: string) => {
  const userId = await getUserIdFromSession()

  const db = await getDbOfUser(userId as number, dbName)
  if (!db)
    return {
      error: `${dbName} is not a DB of user ${userId}`,
    }

  await deleteDB(dbName)

  redirect("/databases")
}
