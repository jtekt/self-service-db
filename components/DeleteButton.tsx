"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash } from "lucide-react";
import { deleteDbAction } from "@/actions/databases";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type Props = {
  name: string;
};

export default function DatabaseDelete(props: Props) {
  const [waitingForConfirm, setWaitingForComfirm] = useState(false);

  const deleteDbActionWithName = deleteDbAction.bind(null, props.name);
  const [state, formAction] = useFormState(deleteDbActionWithName, undefined);

  return (
    <div>
      {waitingForConfirm ? (
        <div className="inline-flex gap-2">
          <form action={formAction}>
            <SubmitButton>
              <Check />
            </SubmitButton>
          </form>
          <Button onClick={() => setWaitingForComfirm(false)}>
            <Ban />
          </Button>
        </div>
      ) : (
        <Button onClick={() => setWaitingForComfirm(true)}>
          <Trash />
        </Button>
      )}
      {state?.error ? (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{state?.error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}
    </div>
  );
}
