"use client"

import MealGroup from "@/components/meal-group"
import { Meal } from "@/lib/types/Meal.types"
import supabase from "@/config/supabaseClient"
import { useEffect, useState } from "react"

export default function Home() {
    const [fetchError, setFetchError] = useState<string>("")
    const [meals, setMeals] = useState<Meal[]>([])

    useEffect(() => {
        const fetchMeals = async () => {
            const { data, error } = await supabase
                .from("recipes_small")
                .select()
                .limit(3)

            if (error) {
                setFetchError("Failed to fetch meals")
                console.log(error)
            }

            if (data) {
                setMeals(data)
                setFetchError("")
            }
        }

        fetchMeals()
    }, [])

    return (
        <div className="mx-96">
            <MealGroup name="Breakfast" meals={meals} />
        </div>
    )
}
