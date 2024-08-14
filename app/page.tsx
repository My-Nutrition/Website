"use client"

import RecipeCard from "@/components/recipe-card"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("Recipe Card")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecipeCard
        title="Tomato and Mozzarella Skewers"
        course="Appetizer"
        onPrimaryClick={() => console.log("Primary")}
        onSecondaryClick={() => console.log("Secondary")}
      />
    </main>
  )
}
