import { Button } from "@/components/ui/button"
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
import { ChevronLeft, Link, Mail } from "lucide-react"
import { z } from "zod"
import { forgotPasswordFormSchema } from "../../../../lib/form-schemes/auth/forgot-password.form-schema"
import { Input } from "@/components/ui/input"

interface ForgotPasswordSlideProps {
    currentFormEmail: string
    onSubmit: (values: z.infer<typeof forgotPasswordFormSchema>) => void
    onBack: () => void
    form?: any
}

const ForgotPasswordSlide: React.FC<ForgotPasswordSlideProps> = ({
    currentFormEmail,
    onSubmit,
    onBack,
    form,
}) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email to reset your password
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
                                            content={currentFormEmail}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row space-x-2">
                            <Button
                                className="w-fit"
                                variant="ghost"
                                type="button"
                                onClick={() => onBack()}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button className="w-full" type="submit">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ForgotPasswordSlide
