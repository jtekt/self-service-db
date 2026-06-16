"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  value: string;
};

export default function CopyToClipboardButton(props: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.value);
      setIsCopied(true);

      // Reset the status back to default after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button onClick={() => handleCopy()} size="icon" variant="ghost">
      {isCopied ? <CopyCheckIcon size="16" /> : <CopyIcon size="16" />}
    </Button>
  );
}
