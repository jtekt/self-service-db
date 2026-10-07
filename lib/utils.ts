import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// On/off env flags: only "true", "1" or "yes" (any case) turn a flag on, so
// that e.g. "false" doesn't enable it
export function isEnabled(value: string | undefined): boolean {
  return ["true", "1", "yes"].includes(value?.trim().toLowerCase() ?? "")
}

// For flags that default to on: only "false", "0" or "no" (any case) turn
// them off, so a typo or empty value keeps the safe default
export function isDisabled(value: string | undefined): boolean {
  return ["false", "0", "no"].includes(value?.trim().toLowerCase() ?? "")
}
