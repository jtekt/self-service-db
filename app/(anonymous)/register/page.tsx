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

import { createUserAction } from "../../../lib/actions/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Name is too short" })
      .regex(/^[a-z0-9_-]+$/, { message: "Invalid format" }),
    password: z.string().min(6, { message: "" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export default function () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    try {
      await createUserAction(values);
    } catch (error: any) {
      console.error(error);
      setError(error.toString());
    } finally {
      setPending(false);
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
                  <FormDescription>Min 6 characters</FormDescription>
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
            <div className="text-center">
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <Loader2 className="mx-auto animate-spin" />
                ) : (
                  <>Register</>
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center text-red-700 my-4">
          {error && <p>{error}</p>}
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
