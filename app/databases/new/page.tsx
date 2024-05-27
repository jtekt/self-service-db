import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { headers } from "next/headers"
import NewDbForm from "@/components/NewDbForm"
export default function () {
  const userString = headers().get("X-User")
  if (!userString) throw "User not found"
  const user = JSON.parse(userString)

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
      <h2 className="text-4xl my-4">Create new database</h2>
      <NewDbForm username={user.username} />
    </>
  )
}
