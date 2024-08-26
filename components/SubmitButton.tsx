import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropsWithChildren } from "react"

type Props = {}

export function SubmitButton(props: PropsWithChildren<Props>) {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit" className="block mx-auto">
      {pending ? <Loader2 className="mx-auto animate-spin" /> : props.children}
    </Button>
  )
}
