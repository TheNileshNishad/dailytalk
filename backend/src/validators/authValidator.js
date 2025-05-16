import { z } from "zod"

// Reusable fields
const userNameSchema = z
  .string({ message: "Username must be a string!" })
  .trim()
  .min(3, { message: "Username must be at least 3 characters long!" })
  .max(40, { message: "Username must be at most 40 characters long!" })
  .transform((val) => val.toLowerCase())

const passwordSchema = z
  .string({ message: "Password must be a string!" })
  .trim()
  .min(8, { message: "Password must be at least 8 characters long!" })
  .max(40, { message: "Password must be at most 40 characters long!" })

// forms validation
const registerSchema = z.object({
  name: z
    .string({ message: "Name must be a string!" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(40, { message: "Name must be at most 40 characters long!" }),
  userName: userNameSchema,
  password: passwordSchema,
})

const loginSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
})

const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
})

export { registerSchema, loginSchema, changePasswordSchema }
