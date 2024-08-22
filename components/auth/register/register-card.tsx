import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"

import supabase from "@/config/supabaseClient"
import { useState } from "react"
import SuccessContent from "./slides/success-slide"
import { toast, useToast } from "@/components/ui/use-toast"
import { handleError } from "../error-handler"
import { registerFormSchema } from "../../../lib/form-schemes/auth/register.form-schema"
import RegisterSlide from "./slides/register-slide"

export const RegisterCard = () => {
    const { toast } = useToast()

    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const [email, setEmail] = useState<string>("")

    const registerForm = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstName: "Max",
            lastName: "Mustermann",
            email: "test5@gmail.com",
            password: "Test1234!",
        },
    })

    async function onSubmitRegister(
        values: z.infer<typeof registerFormSchema>,
    ) {
        let { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        })

        if (error) {
            console.log(error.message)

            toast(handleError(error))
        } else {
            setSelectedSlide(2)
        }

        setEmail(values.email)
        setSelectedSlide(2)
    }

    const setSelectedSlide = (index: number) => {
        carouselApi?.scrollTo(index)
    }

    return (
        <Carousel opts={{ watchDrag: false }} setApi={setCarouselApi}>
            <CarouselContent>
                <CarouselItem>
                    <RegisterSlide
                        onSubmit={onSubmitRegister}
                        form={registerForm}
                    />
                </CarouselItem>

                <CarouselItem>
                    <SuccessContent
                        email={email}
                        onBack={() => setSelectedSlide(0)}
                        onContinue={() => console.log("Continue")}
                    />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}
