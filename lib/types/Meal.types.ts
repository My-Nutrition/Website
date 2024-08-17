export interface MealBadgeItem {
    label: string
    icon: React.ElementType
}

export type Meal = {
    title: string
    course: string
    imageUrl?: string
    badges: MealBadgeItem[]
}
