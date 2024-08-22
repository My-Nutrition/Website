import { z } from "zod"

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(254, { message: "Email can't be longer than 254 characters" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(48, { message: "Password can't be longer than 48 characters" })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, {
            message: "Password must contain at least one special character",
        }),
})
