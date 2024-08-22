import { useState, useCallback } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

import supabase from "@/config/supabaseClient"
import { handleError } from "../error-handler"
import { loginFormSchema } from "../../../lib/form-schemes/auth/login.form-schema"
import LoginSlide from "./slides/login-slide"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import ForgotPasswordSlide from "./slides/forgot-password-slide"
import { forgotPasswordFormSchema } from "../../../lib/form-schemes/auth/forgot-password.form-schema"

export const LoginCard = () => {
    const { toast } = useToast()

    const [carouselApi, setCarouselApi] = useState<CarouselApi>()

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "test@gmail.com",
            password: "Test1234!",
        },
    })

    const { getValues } = loginForm

    const forgotPasswordForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "test1@gmail.com",
            password: "Test1234!",
        },
    })

    async function submitLogin(values: z.infer<typeof loginFormSchema>) {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })

        if (error) {
            console.log(error.message)

            toast(handleError(error))
        }

        console.log(data)
    }

    async function submitForgotPassword(
        values: z.infer<typeof forgotPasswordFormSchema>,
    ) {
        let { data, error } = await supabase.auth.resetPasswordForEmail(
            values.email,
        )

        if (error) {
            console.log(error.message)

            toast(handleError(error))
        }

        console.log(data)
    }

    const setSelectedSlide = useCallback(
        (index: number) => {
            carouselApi?.scrollTo(index)
        },
        [carouselApi],
    )
    return (
        <Carousel opts={{ watchDrag: false }} setApi={setCarouselApi}>
            <CarouselContent>
                <CarouselItem>
                    <LoginSlide
                        onSubmit={submitLogin}
                        form={loginForm}
                        onForgotPassword={() => setSelectedSlide(1)}
                    />
                </CarouselItem>
                <CarouselItem>
                    <ForgotPasswordSlide
                        currentFormEmail={getValues().email}
                        form={forgotPasswordForm}
                        onSubmit={submitForgotPassword}
                        onBack={() => setSelectedSlide(0)}
                    />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}
