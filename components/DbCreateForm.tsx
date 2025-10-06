"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitButton } from "@/components/SubmitButton";
import { createDbAction } from "@/lib/actions/databases";
import { PropsWithChildren } from "react";
import { env } from "next-runtime-env";
import { z } from "zod";

type Props = { username: string };

// TODO: This is not used. Is it because using Actions bypasses Zod validation?
const formSchema = z.object({
  database: z.string().regex(/^[a-z0-9_-]+$/, { message: "Invalid format" }),
});

export function DbCreateForm(props: PropsWithChildren<Props>) {
  const prefixWithUsername = env("NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      database: "",
    },
  });

  // TODO: upgrade to React 19 and use useActionState for access to "pending"
  const [state, formAction] = useFormState(createDbAction, undefined);

  return (
    <Form {...form}>
      {/* TODO: figure out wether to use action or onSubmit={form.handleSubmit(onSubmit)} */}

      <form action={formAction} className="space-y-4">
        <FormField
          control={form.control}
          name="database"
          render={({ field }) => (
            <FormItem className="flex items-baseline gap-1">
              {/* <FormLabel>Database name</FormLabel> */}
              {prefixWithUsername && (
                <span className="py-2 text-sm">{props.username}-</span>
              )}
              <FormControl>
                <Input placeholder="My database" {...field} />
              </FormControl>
              {/* <FormDescription>Alphanumeric</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>
          <Save />
        </SubmitButton>
      </form>
      {state?.error && <div className="my-4 text-center">{state?.error}</div>}
    </Form>
  );
}
