"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_NAME } from "@/config"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import axios from "axios"

export default function () {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      database: "",
    },
  })

  const router = useRouter()

  async function onSubmit(values: any) {
    setLoading(true)
    const cookies = new Cookies()
    const token = cookies.get(TOKEN_COOKIE_NAME)
    const headers = { Authorization: `Bearer ${token}` }
    try {
      const { data } = await axios.post("/api/databases", values, { headers })

      router.push(`/databases/${data.database}`)
    } catch (error: any) {
      const message = error.response?.data?.message || "DB creation failed"
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>New database</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="database"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        pattern="^[a-zA-Z0-9_]*$"
                      />
                    </FormControl>
                    <FormDescription>Alphanumeric</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                className="block mx-auto"
              >
                {loading ? (
                  <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
