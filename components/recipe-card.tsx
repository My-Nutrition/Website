"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChefHat, CookingPot, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTranslations } from "next-intl"

enum State {
  Idle = "idle",
  Hover = "hover",
  Finished = "finished",
}

const RecipeCard = ({
  title,
  course,
  onPrimaryClick,
  onSecondaryClick,
}: {
  title: string
  course: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}) => {
  const t = useTranslations("Recipe Card")

  const [finished, setFinished] = useState<boolean>(false)

  return (
    <Card
      className={cn(
        "w-[28rem] overflow-hidden box-border",
        finished && "outline outline-4 outline-primary",
      )}
    >
      <CardContent
        className="p-0 relative w-full h-auto overflow-hidden rounded-b-lg group"
        onClick={() => setFinished(!finished)}
      >
        <Image
          className="block w-full h-auto"
          src="/recipe-image.jpg"
          alt="Recipe Image"
          objectFit="cover"
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-2 right-2 text-white flex flex-col space-y-1">
          <Label className="font-light text-base">{course}</Label>
          <Label className="font-semibold text-xl">{title}</Label>
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

export default RecipeCard
