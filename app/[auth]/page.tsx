"use client"

import { LoginCard } from "@/components/auth/login/login-card"
import { RegisterCard } from "@/components/auth/register/register-card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"

export default function Auth() {
    const router = useRouter()
    const { auth } = useParams()
    const defaultTab = auth === "register" ? "register" : "login"

    return (
        <div className="flex mt-52 justify-center">
            <Tabs defaultValue={defaultTab} className="max-w-[400px]">
                <TabsList className="w-full">
                    <TabsTrigger
                        className="w-1/2"
                        value="login"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </TabsTrigger>
                    <TabsTrigger
                        className="w-1/2"
                        value="register"
                        onClick={() => router.push("/register")}
                    >
                        Register
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="w-[400px]">
                    <LoginCard />
                </TabsContent>
                <TabsContent value="register" className="w-[400px]">
                    <RegisterCard />
                </TabsContent>
            </Tabs>
        </div>
    )
}
