import React from "react"
import { Button } from "@/components/ui/button"

import { Check, ChevronLeft, Edit } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface SuccessContentProps {
    email: string
    onBack: () => void
    onContinue: () => void
}

const SuccessContent: React.FC<SuccessContentProps> = ({
    email,
    onBack,
    onContinue,
}) => {
    return (
        <Card className="w-full h-[420px]">
            <CardContent className="flex flex-col justify-center items-center w-full h-full">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center border shadow">
                    <Check className="w-12 h-12" />
                </div>

                <Label className="text-2xl font-semibold mt-4">Success!</Label>

                <Button variant="link" className="mt-4">
                    {email} <Edit className="w-4 h-4 ml-2" />
                </Button>

                <Label className="text-sm text-muted-foreground font-normal text-center">
                    Please click the link in the email we've sent you to verify
                    your account.
                </Label>

                <div className="flex justify-center space-x-2">
                    <Button className="mt-12" variant="ghost" onClick={onBack}>
                        <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button className="mt-12" onClick={onContinue}>
                        Continue
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SuccessContent
