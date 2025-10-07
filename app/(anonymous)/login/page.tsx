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

import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function () {
  // Not yet working in React 18.3.1
  // const [state, action, pending] = useActionState(handleFormSubmit, undefined)

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPending(true);
    const { username, password } = values;
    const { error } = await loginAction(username, password);
    if (error) {
      setError(error);
      setPending(false);
      return;
    }
    router.push("/databases");
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
            {error && <p>{error}</p>}
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
