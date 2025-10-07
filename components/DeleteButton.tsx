"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash, Loader2 } from "lucide-react";
import { deleteDbAction } from "@/lib/actions/databases";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  // const [error, setError] = useState("")
  const router = useRouter();

  async function handleClick() {
    setPending(true);

    const { error } = await deleteDbAction(props.name);
    if (error) {
      // setError(error);
      alert(error);
      setPending(false);
      return;
    }
    router.push(`/databases`);
  }

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
