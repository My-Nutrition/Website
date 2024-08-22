import { z } from "zod"
import { loginFormSchema } from "../../../../lib/form-schemes/auth/login.form-schema"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

interface LoginSlideProps {
    onSubmit: (values: z.infer<typeof loginFormSchema>) => void
    onForgotPassword: () => void
    form?: any
}

const LoginSlide: React.FC<LoginSlideProps> = ({
    onSubmit,
    onForgotPassword,
    form,
}) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>

            <CardContent className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
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
                                        <Link
                                            href="#"
                                            className="flex w-full justify-end text-sm underline"
                                            onClick={onForgotPassword}
                                        >
                                            Forgot your password?
                                        </Link>
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
                        <div className="space-y-2">
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>

                            <Button
                                className="w-full"
                                variant="outline"
                                type="button"
                            >
                                <FcGoogle className="mr-2 w-4 h-4" />
                                Login with Google
                            </Button>

                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline">
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

export default LoginSlide
