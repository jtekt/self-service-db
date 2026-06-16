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
import { getDatabaseCache } from "@/actions/databases";
import { Input } from "@/components/ui/input";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

type Params = { name: string };
export default async function DatabasePage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const NEXT_PUBLIC_DB_HOST = env("NEXT_PUBLIC_DB_HOST");
  const NEXT_PUBLIC_DB_PORT = env("NEXT_PUBLIC_DB_PORT");
  const NEXT_PUBLIC_DB_SSL_MODE = env("NEXT_PUBLIC_DB_SSL_MODE") || "disable";

  const database = await getDatabaseCache(params.name);

  const host = NEXT_PUBLIC_DB_HOST || database.host;
  const port = NEXT_PUBLIC_DB_PORT || database.port;

  const urlQueryParameters = `?sslmode=${NEXT_PUBLIC_DB_SSL_MODE}`;

  const connectionString = `postgresql://${database.username}:YOUR_PASSWORD@${
    host
  }:${NEXT_PUBLIC_DB_PORT || database.port}/${database.db}${urlQueryParameters}`;

  const fields = [
    {
      label: "Host",
      value: host,
    },
    {
      label: "Port",
      value: port,
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
      label: "SSL mode",
      value: NEXT_PUBLIC_DB_SSL_MODE,
    },
    {
      label: "Connection string",
      value: connectionString,
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

        <dl className="">
          {fields.map((field) => (
            <div
              className="px-1 py-2 grid grid-cols-4 gap-2 items-center"
              key={field.label}
            >
              <dt className="text-sm font-medium leading-4">{field.label}</dt>
              <dd className="mt-1 text-sm col-span-3 flex gap-2 items-center">
                <Input value={field.value} readOnly />
                <CopyToClipboardButton value={field.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
