"use client";
// import { useActionState } from "react"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useFormState } from "react-dom";
import { loginAction } from "../../../lib/actions/auth";

export default function () {
  // Not yet working in React 18.3.1
  // const [state, action, pending] = useActionState(handleFormSubmit, undefined)

  const [state, formAction] = useFormState(loginAction, undefined);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
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
            <SubmitButton>
              <div className="flex gap-2 items-center">
                <LogIn />
                <span>Login</span>
              </div>
            </SubmitButton>
          </form>

          <div className="text-center my-4">
            {state?.error && <p>{state?.error}</p>}
          </div>

          <p className="text-center mt-4">
            No account? Register{" "}
            <Link href="/register" className="font-bold text-primary">
              here
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}
