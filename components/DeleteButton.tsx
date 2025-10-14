"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash, Loader2 } from "lucide-react";
import { deleteDbAction } from "@/actions/databases";
import { startTransition, useActionState, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
type Props = {
  name: string;
};

export default function DatabaseDelete(props: Props) {
  const [waitingForConfirm, setWaitingForComfirm] = useState(false);

  const actionWithName = deleteDbAction.bind(null, props.name);
  const [state, action, pending] = useActionState(actionWithName, null);

  function handleClick() {
    startTransition(() => action());
  }

  // TODO: error handling with useEffect

  return (
    <div>
      {waitingForConfirm ? (
        <div className="inline-flex gap-2">
          <Button onClick={() => handleClick()} disabled={pending}>
            {pending ? <Loader2 className="mx-auto animate-spin" /> : <Check />}
          </Button>
          <Button onClick={() => setWaitingForComfirm(false)}>
            <Ban />
          </Button>
        </div>
      ) : (
        <Button onClick={() => setWaitingForComfirm(true)}>
          <Trash />
        </Button>
      )}
      {/* TODO: reimplement */}
      {/* {error && (
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) } */}
    </div>
  );
}
