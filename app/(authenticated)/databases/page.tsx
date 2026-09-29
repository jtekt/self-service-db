import Link from "next/link";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDatabasesCache } from "@/actions/databases";

export default async function DatabasesPage() {
  const databases = await getDatabasesCache();

  return (
    <div className="mx-auto max-w-lg space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your databases</h1>
        <Link
          href="/databases/new"
          className={buttonVariants({ size: "icon" })}
          aria-label="New database"
          title="New database"
        >
          <PlusIcon className="size-4" />
        </Link>
      </div>

      {databases.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t created any databases yet.
        </p>
      ) : (
        <div className="space-y-3">
          {databases.map((database) => (
            <Link
              key={database.name}
              href={`/databases/${database.name}`}
              className="block"
            >
              <Card className="transition-colors hover:bg-accent/50">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{database.name}</p>
                    {database.size && (
                      <p className="text-sm text-muted-foreground">
                        {database.size}
                      </p>
                    )}
                  </div>
                  <ChevronRightIcon className="size-5 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
