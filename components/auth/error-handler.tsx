import { AuthError } from "@supabase/supabase-js"
import { Button } from "../ui/button"

export function handleError(error: AuthError) {
    let title: string = ""
    let description: string = ""

    if (error.message.includes("Email not confirmed")) {
        title = "Verify your Email"
        description =
            "Please confirm your email address to access your account."
    } else if (error.message.includes("Invalid login credentials")) {
        title = "Email or Password is wrong."
        description =
            "Please enter valid credentials to continue, please try again!"
    } else if (error.message.includes("Email rate limit exceeded")) {
        title = "There was a problem on our side!"
        description =
            "Please try again in a few minutes, thanks for your patients."
    } else {
        title = "Uh oh! Something went wrong."
        description = "Uh oh! Something went wrong."
    }

    return {
        title: title,
        description: description,
        action: <Button>Help Me!</Button>,
    }
}
