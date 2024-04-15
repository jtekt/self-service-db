import * as jose from "jose"
import { encodedJwtSecret } from "@/config"

export async function createToken(data: any) {
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedJwtSecret)

  return token
}
