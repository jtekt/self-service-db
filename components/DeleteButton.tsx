"use client";

import { startTransition, useActionState, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { deleteDbAction } from "@/actions/databases";

type Props = {
  name: string;
};

export default function DatabaseDelete({ name }: Props) {
  const actionWithName = deleteDbAction.bind(null, name);
  const [state, action, pending] = useActionState(actionWithName, null);
  const [open, setOpen] = useState(false);

  // On success the action redirects to /databases
  function onConfirm() {
    startTransition(() => action());
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          aria-label={`Delete ${name}`}
          title="Delete database"
        >
          <Trash2Icon />
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Delete database</DialogTitle>
          <DialogDescription>
            You are about to permanently delete the following database
          </DialogDescription>
        </DialogHeader>

        <div className="rounded bg-accent p-2 font-mono">{name}</div>

        <p className="text-destructive">
          All of its data is deleted with it. This action cannot be undone.
        </p>

        {state?.error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Deleting…
              </span>
            ) : (
              "Delete database"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
