import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function () {
  const [loggingIn, setLoggingIn] = useState(false)

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: any) {
    const url = `${VITE_API_URL}/login`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>Your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormDescription>Your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loggingIn} type="submit" className="block mx-auto">
          {loggingIn ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            <span>Login</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
