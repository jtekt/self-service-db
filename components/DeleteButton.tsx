"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_NAME } from "@/config"
import { deleteDbAction } from "@/app/actions/databases"

type Props = {
  name: string
}

export default function DeleteButton(props: Props) {
  async function handleClick() {
    if (!confirm("Delete DB?")) return

    await deleteDbAction(props.name)
  }
  return (
    <Button type="submit" onClick={handleClick}>
      Delete
    </Button>
  )
}
