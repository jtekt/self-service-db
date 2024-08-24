"use server"
import { cache } from "react"
import { getUserIdFromSession } from "../lib/sessions"
import {
  checkIfDbExists,
  createDb,
  deleteDB,
  getDbOfUser,
  getDbsOfuser,
  getUserNameById,
} from "../lib/databases"
import { DB_HOST, DB_PORT } from "@/config"
import format from "pg-format"
import { pool } from "@/db"
import { redirect } from "next/navigation"
import { FormState } from "react-hook-form"

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

  console.log({ username, dbName })

  await createDb(dbName, username)

  redirect("/databases")
}

export const deleteDbAction = async (dbName: string) => {
  const userId = await getUserIdFromSession()

  const db = await getDbOfUser(userId as number, dbName)
  if (!db) throw new Error(`${dbName} is not a DB of user ${userId}`)

  await deleteDB(dbName)

  redirect("/databases")
}
