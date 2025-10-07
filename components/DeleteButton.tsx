"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash } from "lucide-react";
import { deleteDbAction } from "@/lib/actions/databases";
import { useState } from "react";
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
  const [pending, setPending] = useState(false);
  // const [error, setError] = useState("");

  async function handleClick() {
    setPending(true);
    try {
      await deleteDbAction(props.name);
    } catch (error) {
      alert("DB deletion failed");
      // setError(error.toString())
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      {waitingForConfirm ? (
        <div className="inline-flex gap-2">
          <Button onClick={() => handleClick()} disabled={pending}>
            <Check />
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
