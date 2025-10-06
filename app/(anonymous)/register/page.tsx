"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SubmitButton } from "@/components/SubmitButton";
import { createUserAction } from "../../../lib/actions/auth";
import { useFormState } from "react-dom";

export default function () {
  const [state, formAction] = useFormState(createUserAction, undefined);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
                    <Input
                      placeholder="Username"
                      {...field}
                      pattern="^[a-z0-9_]*$"
                    />
                  </FormControl>
                  <FormDescription>Lowercase alphanumeric only</FormDescription>
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
                  {/* <FormDescription>Your password</FormDescription> */}
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
                  {/* <FormDescription>Password confirm</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton>Register</SubmitButton>
          </form>
        </Form>
        <div className="text-center my-4">
          {state?.error && <p>{state?.error}</p>}
        </div>

        <p className="text-center mt-4">
          Already have an account? Login{" "}
          <Link href="/login" className="font-bold text-primary">
            here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
