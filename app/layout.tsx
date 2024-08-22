import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const locale = "en"
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <body className={inter.className}>
                    <main>{children}</main>
                    <Toaster />
                </body>
            </NextIntlClientProvider>
        </html>
    )
}
