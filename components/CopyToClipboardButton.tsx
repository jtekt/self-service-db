"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value: string;
};

export default function CopyToClipboardButton(props: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport =
      typeof window !== "undefined" &&
      window.isSecureContext &&
      !!navigator.clipboard;

    setIsSupported(checkSupport);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return isSupported ? (
    <Button onClick={() => handleCopy()} size="icon" variant="ghost">
      {isCopied ? <CopyCheckIcon size="16" /> : <CopyIcon size="16" />}
    </Button>
  ) : (
    <></>
  );
}
