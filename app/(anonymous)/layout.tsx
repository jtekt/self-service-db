import { redirect } from "next/navigation";

import { getUserIdFromSession } from "@/lib/sessions";

export default async function AnonymousLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserIdFromSession();
  if (userId != null) redirect("/");
  return children;
}
