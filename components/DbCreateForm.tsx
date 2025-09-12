"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Save } from "lucide-react";

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

type Props = { username: string };

export function DbCreateForm(props: PropsWithChildren<Props>) {
  const prefixWithUsername = env("NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME");

  const form = useForm({
    defaultValues: {
      database: "",
    },
  });

  const [state, formAction] = useFormState(createDbAction, undefined);

  return (
    <Form {...form}>
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
                <Input
                  placeholder="Name"
                  {...field}
                  pattern="^[a-zA-Z0-9-_]*$"
                />
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
