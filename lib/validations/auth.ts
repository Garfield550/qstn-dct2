import { z } from 'zod'

export const userAuthSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
})
