import DeleteButton from "@/components/DeleteButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { env } from "next-runtime-env";
import { getDatabaseCache } from "@/lib/actions/databases";

type Params = { name: string };
export default async function DatabasePage({ params }: { params: Params }) {
  const NEXT_PUBLIC_DB_HOST = env("NEXT_PUBLIC_DB_HOST");
  const NEXT_PUBLIC_DB_PORT = env("NEXT_PUBLIC_DB_PORT");
  const NEXT_PUBLIC_DB_SSL = env("NEXT_PUBLIC_DB_SSL");

  const database = await getDatabaseCache(params.name);

  const fields = [
    {
      label: "Host",
      value: NEXT_PUBLIC_DB_HOST || database.host,
    },
    {
      label: "Port",
      value: NEXT_PUBLIC_DB_PORT || database.port,
    },
    {
      label: "Database",
      value: database.db,
    },
    {
      label: "User",
      value: database.username,
    },
    {
      label: "SSL",
      value: NEXT_PUBLIC_DB_SSL ? "Yes" : "No",
    },
    {
      label: "Connection string",
      value: `postgresql://${database.username}:YOUR_PASSWORD@${
        NEXT_PUBLIC_DB_HOST || database.host
      }:${NEXT_PUBLIC_DB_PORT || database.port}/${database.db}`,
    },
  ];

  return (
    <>
      <div className="mt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/databases">Databases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {database ? database.db : "Database"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between my-4 ">
          <h2 className="text-4xl">{database ? database.db : "Database"}</h2>
          <DeleteButton name={params.name} />
        </div>

        <dl className="divide-y">
          {fields.map((field) => (
            <div className="px-1 py-2 grid grid-cols-4 gap-2" key={field.label}>
              <dt className="text-sm font-medium leading-6">{field.label}</dt>
              <dd className="mt-1 text-sm col-span-3 ">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
