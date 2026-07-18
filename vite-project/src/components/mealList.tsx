import MealCard from "./mealCard.tsx"
import { SearchX } from "lucide-react"
import { Meal } from "./allergens.ts"

interface Props {
    meals: Meal[]
    query: string
    useUS: boolean
}

export default function MealList({ meals, query, useUS }: Props) {
    if (meals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
                <SearchX size={48} />
                <p className="text-lg">No meals found{query ? ` for "${query}"` : ""}.</p>
            </div>
        )
    }

    return (
        <div className="mb-4 grid grid-cols-2 gap-4">
            {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} useUS={useUS} />
            ))}
        </div>
    )
}
