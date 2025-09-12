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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SubmitButton } from "@/components/SubmitButton";
import { createDbAction } from "@/lib/actions/databases";
import { DbCreateForm } from "@/components/DbCreateForm";
import { getUsernameCache } from "@/lib/actions/user";

export default async function () {
  const username = await getUsernameCache();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-4xl my-4">New database</h2>
      <DbCreateForm username={username} />
    </>
  );
}
