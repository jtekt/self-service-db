"use client"

import { Button } from "@/components/ui/button"

import { deleteDbAction } from "@/app/actions/databases"
import { useState } from "react"
import { SubmitButton } from "./SubmitButton"
import { useFormState } from "react-dom"

type Props = {
  name: string
}

export default function DatabaseDelete(props: Props) {
  const [waitingForConfirm, setWaitingForComfirm] = useState(false)

  const deleteDbActionWithName = deleteDbAction.bind(null, props.name)
  const [state, formAction] = useFormState(deleteDbActionWithName, undefined)

  return (
    <>
      {waitingForConfirm ? (
        <div className="inline-flex gap-2">
          <form action={formAction}>
            <SubmitButton text="Confirm" />
          </form>
          <Button onClick={() => setWaitingForComfirm(false)}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={() => setWaitingForComfirm(true)}>Delete</Button>
      )}
    </>
  )
}
