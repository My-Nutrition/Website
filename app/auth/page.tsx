"use client"

import { LoginCard } from "@/components/auth/login-card"
import { RegisterCard } from "@/components/auth/register-card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Login() {
    return (
        <div className="flex mt-52 justify-center">
            <Tabs defaultValue="login" className="max-w-[400px]">
                <TabsList className="w-full">
                    <TabsTrigger className="w-1/2" value="login">
                        Login
                    </TabsTrigger>
                    <TabsTrigger className="w-1/2" value="register">
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
