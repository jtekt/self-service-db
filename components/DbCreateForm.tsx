"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { createDbAction } from "@/lib/actions/databases";
import { PropsWithChildren, useState } from "react";
import { env } from "next-runtime-env";
import { z } from "zod";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = { username: string };

const formSchema = z.object({
  database: z
    .string()
    .min(3, { message: "Name is too short" })
    .regex(/^[a-z0-9_-]+$/, { message: "Invalid format" }),
});

export function DbCreateForm(props: PropsWithChildren<Props>) {
  const prefixWithUsername = env("NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      database: "",
    },
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit({ database }: z.infer<typeof formSchema>) {
    setPending(true);
    const { error, db } = await createDbAction(database);
    if (error) {
      setError(error);
      setPending(false);
      return;
    }
    router.push(`/databases/${db}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="database"
          render={({ field }) => (
            <div>
              <FormItem className="flex items-baseline gap-1">
                {/* <FormLabel>Database name</FormLabel> */}
                {prefixWithUsername && (
                  <span className="py-2 text-sm">{props.username}-</span>
                )}
                <div></div>
                <FormControl>
                  <Input placeholder="My database" {...field} />
                </FormControl>
                {/* <FormDescription>Alphanumeric</FormDescription> */}
              </FormItem>
              <div className="text-center my-4">
                <FormMessage />
              </div>
            </div>
          )}
        />
        <Button disabled={pending} type="submit" className="block mx-auto">
          {pending ? <Loader2 className="mx-auto animate-spin" /> : <Save />}
        </Button>
        {error && <div className="text-center text-red-600">{error}</div>}
      </form>
    </Form>
  );
}
