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
import { useNavigate, Link } from "react-router-dom"
import Cookies from "universal-cookie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const { VITE_API_URL } = import.meta.env

export default function () {
  const [registering, setRegistering] = useState(false)

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const navigate = useNavigate()

  async function onSubmit(values: any) {
    const url = `${VITE_API_URL}/users`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }

    setRegistering(true)
    try {
      const response = await fetch(url, options)
      const { token } = await response.json()
      const cookies = new Cookies()
      cookies.set("token", token, { path: "/" })

      navigate("/databases")
    } catch (error) {
      alert(error)
    } finally {
      setRegistering(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
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

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Password confirm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registering}
              type="submit"
              className="block mx-auto"
            >
              {registering ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center mt-4">
          Already have an account? Login <Link to="/login"> here</Link>
        </p>
      </CardContent>
    </Card>
  )
}
