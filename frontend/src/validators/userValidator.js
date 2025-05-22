import { z } from "zod"

const updateUserSchema = z.object({
  name: z
    .string({ message: "Name must be a string!" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(40, { message: "Name must be at most 40 characters long!" }),

  userName: z
    .string({ message: "Username must be a string!" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(40, { message: "Username must be at most 40 characters long!" })
    .transform((val) => val.toLowerCase()),

  bio: z
    .string({ message: "Bio must be a string!" })
    .trim()
    .max(250, { message: "Bio must be at most 250 characters long!" })
    .optional(),

  gender: z
    .enum(["male", "female", "prefer not to say"], {
      message: "Gender must be 'male', 'female' or 'prefer not to say'",
    })
    .optional(),
})

export default updateUserSchema
