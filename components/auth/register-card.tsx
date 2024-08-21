import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { FcGoogle } from "react-icons/fc"
import Link from "next/link"

const namePattern = /^[a-zA-Zà-ÿÀ-ß'-\s]+$/

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(50, { message: "First name can't be longer than 50 characters" })
        .regex(namePattern, {
            message:
                "First name can only contain letters, spaces, hyphens, and apostrophes",
        }),

    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(50, { message: "Last name can't be longer than 50 characters" })
        .regex(namePattern, {
            message:
                "Last name can only contain letters, spaces, hyphens, and apostrophes",
        }),
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

export const RegisterCard = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                    Enter your details below to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="flex flex-row items-end space-x-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Max"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex flex-row">
                                            Last Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Mustermann"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex flex-row">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-3">
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>

                            <Button className="w-full" variant="outline">
                                <FcGoogle className="mr-2 w-4 h-4" />
                                Login with Google
                            </Button>

                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="#" className="underline">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
