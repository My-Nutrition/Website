import React, { useState, useEffect } from "react"
import MealCard from "@/components/meal-card"
import { Meal, MealBadgeItem } from "@/lib/types/Meal.types"
import ExpandableSeperator from "./expandable-seperator"
import { Flame, ShoppingCart, Clock } from "lucide-react"

interface MealGroupProps {
    name: string
    meals: Meal[]
}

const badgeIcons = {
    Flame,
    ShoppingCart,
    Clock,
}

const MealGroup: React.FC<MealGroupProps> = ({ meals, name }) => {
    const [expanded, setExpanded] = useState<boolean>(true)
    const [showCheck, setShowCheck] = useState<boolean>(false)

    const [finishedStates, setFinishedStates] = useState<
        Record<number, boolean>
    >({})

    const toggleFinished = (index: number) => {
        setFinishedStates((prevStates) => {
            const newStates = { ...prevStates, [index]: !prevStates[index] }

            if (!newStates[index]) {
                setShowCheck(false)
            }

            if (Object.values(newStates).every(Boolean)) {
                setExpanded(false)

                setTimeout(() => {
                    setShowCheck(true)
                }, 1000)
            }
            return newStates
        })
    }

    useEffect(() => {
        const initialStates = meals.reduce(
            (acc, _, index) => ({ ...acc, [index]: false }),
            {},
        )
        setFinishedStates(initialStates)
    }, [meals])

    function getBadgesWithComponents(
        badges: MealBadgeItem[] = [],
    ): MealBadgeItem[] {
        if (!Array.isArray(badges)) {
            return []
        }

        return badges.map((badge) => ({
            ...badge,
            icon:
                badgeIcons[badge.icon as keyof typeof badgeIcons] ||
                (() => <span>Unknown Icon</span>),
        }))
    }

    return (
        <>
            <ExpandableSeperator
                label={name}
                expanded={expanded}
                setExpanded={setExpanded}
                showCheck={showCheck}
            />

            <div
                className={`overflow-hidden transition-all duration-500 p-3 ${
                    expanded
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="flex flex-row space-x-4">
                    {meals.map((meal, index) => (
                        <MealCard
                            key={index}
                            title={meal.title}
                            course={meal.course}
                            imageUrl={meal.imageUrl ?? ""}
                            badges={getBadgesWithComponents(meal.badges)}
                            onPrimaryClick={() =>
                                console.log("Primary", meal.title)
                            }
                            onSecondaryClick={() =>
                                console.log("Secondary", meal.title)
                            }
                            finished={!!finishedStates[index]}
                            setFinished={() => toggleFinished(index)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MealGroup
