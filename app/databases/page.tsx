import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDatabasesCache } from "../../lib/actions/databases";
import { Plus } from "lucide-react";

export default async function () {
  const databases = await getDatabasesCache();

  return (
    <>
      <div className="flex justify-between mt-4 ">
        <h2 className="text-4xl">Databases</h2>
        <Button asChild>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/databases/new"
          >
            <Plus />
          </Link>
        </Button>
      </div>
      <div className="mt-6">
        <ul>
          {databases.map((database: any) => (
            <li key={database} className="my-2">
              <Link href={`/databases/${database}`}>{database}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
