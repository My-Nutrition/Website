import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChefHat, CookingPot, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Badge } from "./ui/badge"
import { MealBadgeItem } from "@/lib/types/Meal.types"

enum State {
    Idle = "idle",
    Hover = "hover",
    Finished = "finished",
}

const MealCard = ({
    title,
    course,
    imageUrl,
    badges,
    onPrimaryClick,
    onSecondaryClick,
    finished,
    setFinished,
}: {
    title: string
    course: string
    imageUrl: string
    badges: MealBadgeItem[]
    onPrimaryClick?: () => void
    onSecondaryClick?: () => void
    finished: boolean
    setFinished: (flag: boolean) => void
}) => {
    const t = useTranslations("Meal Card")

    if (!imageUrl) imageUrl = "/image-placeholder.jpg"

    return (
        <Card
            className={cn(
                "w-[28rem] h-full overflow-hidden box-border",
                finished && "outline outline-4 outline-primary border-primary",
            )}
        >
            <CardContent
                className="p-0 relative w-full h-auto overflow-hidden rounded-b-lg group"
                onClick={() => setFinished(!finished)}
            >
                <Image
                    className="block w-full aspect-[16/10] object-cover"
                    src={imageUrl}
                    alt="Recipe Image"
                    width={1920}
                    height={1080}
                    priority={true}
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-2 right-2 text-white flex flex-col">
                    <Label className="font-light text-base mb-1">
                        {course}
                    </Label>
                    <Label className="font-semibold text-xl mb-2">
                        {title}
                    </Label>
                    <div className="flex flex-row space-x-2">
                        {badges.map((badge, index) => (
                            <Badge
                                key={index}
                                className="w-fit backdrop-blur-sm bg-black/30 text-card hover:bg-black/30 cursor-default font-medium"
                            >
                                <badge.icon className="w-4 h-4 mr-1" />
                                {badge.label}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div
                    className={cn(
                        "absolute top-2 right-2 w-auto group-hover:w-fit group-hover:px-2 h-10 rounded-full backdrop-blur-sm bg-black/30 flex justify-end",
                    )}
                >
                    <div className="flex items-center justify-center w-10 group-hover:w-fit h-10">
                        <Label className="hidden mr-2 pl-2 text-card font-normal group-hover:block">
                            {t("Finish Indicator Text")}
                        </Label>
                        <Check
                            className={cn(
                                "text-muted/80 mt-[0.1rem] stroke-2",
                                finished && "text-primary",
                            )}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="space-x-2 p-2 w-full">
                <Button variant="secondary" onClick={onSecondaryClick}>
                    <CookingPot className="w-4 h-4 mr-2" />
                    {t("Prepare Recipe")}
                </Button>
                <Button className="w-full" onClick={onPrimaryClick}>
                    <ChefHat className="w-4 h-4 mr-2" />
                    {t("View Recipe")}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default MealCard
