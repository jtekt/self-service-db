import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DbCreateForm } from "@/components/DbCreateForm";
import { getUsernameCache } from "@/actions/user";
import { env } from "next-runtime-env";

export default async function () {
  const username = await getUsernameCache();
  const databaseCreationDisabled = env("NEXT_PUBLIC_DISABLE_DATABASE_CREATION");

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

      {databaseCreationDisabled ? (
        <span>Database creation is disabled on this instance</span>
      ) : (
        <DbCreateForm username={username} />
      )}
    </>
  );
}
