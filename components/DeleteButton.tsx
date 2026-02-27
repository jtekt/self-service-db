"use client";

import { Button } from "@/components/ui/button";
import { Check, Ban, Trash, Loader2 } from "lucide-react";
import { deleteDbAction } from "@/actions/databases";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

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

  useEffect(() => {
    if (state?.error)
      toast.error(state.error, {
        position: "top-center",
      });
  }, [state]);

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
    </div>
  );
}
