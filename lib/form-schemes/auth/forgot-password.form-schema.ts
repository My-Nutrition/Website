import { z } from "zod"

export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(254, { message: "Email can't be longer than 254 characters" })
        .email({ message: "Invalid email address" }),
})
