"use client";
// import { useActionState } from "react"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
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

import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import z from "zod";
import { startTransition, useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function () {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [state, action, pending] = useActionState(loginAction, null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => action(values));
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
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
            <div className="text-center">
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <Loader2 className="mx-auto animate-spin" />
                ) : (
                  <>Login</>
                )}
              </Button>
            </div>
          </form>

          <div className="text-center text-red-700 my-4">
            {state?.error && <p>{state.error}</p>}
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
