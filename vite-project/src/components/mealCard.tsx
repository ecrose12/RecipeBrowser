import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Star, Tag, ScrollText, UtensilsCrossed } from "lucide-react"
import { Meal } from "./allergens.ts"
import { convertToUS } from "./conversions.ts"

interface HistoryEntry {
    rating: number
    comment: string
    timestamp: string
}

interface Ingredient {
    ingredient: string | undefined
    measure: string | undefined
}

interface Props {
    meal: Meal
    useUS: boolean
}

function toTitleCase(str: string): string {
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
}

export default function MealCard({ meal, useUS }: Props) {
    const storageKey = `meal-${meal.idMeal}`
    const rawData = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as { history?: HistoryEntry[] }
    const savedData = { history: Array.isArray(rawData.history) ? rawData.history : [] }

    const [expanded, setExpanded] = useState<boolean>(false)
    const navigate = useNavigate()

    const ingredients: Ingredient[] = Array.from({ length: 20 }, (_, i) => ({
        ingredient: meal[`strIngredient${i + 1}`] ?? undefined,
        measure: meal[`strMeasure${i + 1}`] ?? undefined,
    })).filter(({ ingredient }) => ingredient && ingredient.trim())

    const latestRating = savedData.history.length > 0 ? savedData.history[0].rating : 0

    function handleCardClick() {
        navigate(`/meal/${meal.idMeal}`)
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            navigate(`/meal/${meal.idMeal}`)
        }
    }

    function handlePreviewKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setExpanded(!expanded)
        }
        if (e.key === "Escape") {
            setExpanded(false)
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl relative">
            <figure
                className="cursor-pointer relative"
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                onClick={handleCardClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`View full recipe for ${meal.strMeal}`}
            >
                <img src={meal.strMealThumb} alt={`Photo of ${meal.strMeal}`} />

                <div className="absolute top-2 left-2">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black bg-opacity-60 text-white text-xs font-bold uppercase tracking-wide">
                        <Tag size={11} aria-hidden="true" /> {meal.strCategory}
                    </span>
                </div>

                <button
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-black bg-opacity-60 text-white text-xs font-bold uppercase tracking-wide hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
                    onKeyDown={(e) => { e.stopPropagation(); handlePreviewKeyDown(e) }}
                    aria-expanded={expanded}
                    aria-label={`${expanded ? "Hide" : "Show"} preview for ${meal.strMeal}`}
                >
                    {expanded ? "Hide Preview" : "Quick Preview"}
                </button>

                {expanded && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-80 text-white overflow-y-auto p-4 flex flex-col gap-2"
                        role="region"
                        aria-label={`Quick preview of ${meal.strMeal}`}
                    >
                        <h3 className="font-bold text-lg">{toTitleCase(meal.strMeal)}</h3>
                        <p className="flex items-center gap-1 text-xs text-gray-300">
                            <Tag size={12} aria-hidden="true" /> {meal.strCategory}
                        </p>

                        <h4 className="font-semibold text-sm flex items-center gap-1 mt-1">
                            <UtensilsCrossed size={14} aria-hidden="true" /> Ingredients
                        </h4>
                        <ul className="text-xs list-disc list-inside" aria-label="Ingredients preview">
                            {ingredients.slice(0, 8).map(({ ingredient, measure }, i) => (
                                <li key={i}>{useUS ? convertToUS(`${measure}`) : measure} {ingredient}</li>
                            ))}
                            {ingredients.length > 8 && (
                                <li className="text-gray-400">+{ingredients.length - 8} more...</li>
                            )}
                        </ul>

                        <h4 className="font-semibold text-sm flex items-center gap-1 mt-1">
                            <ScrollText size={14} aria-hidden="true" /> Instructions
                        </h4>
                        <p className="text-xs text-gray-300 line-clamp-4">{meal.strInstructions}</p>
                    </div>
                )}
            </figure>

            <div className="card-body items-center text-center">
                <h2 className="font-extrabold text-base-content text-lg tracking-tight">
                    {toTitleCase(meal.strMeal)}
                </h2>
                {latestRating > 0 && (
                    <p className="flex items-center justify-center gap-1 text-yellow-400 text-sm" aria-label={`Rated ${latestRating} out of 5 stars`}>
                        {Array.from({ length: 5 }, (_, j) => (
                            <Star key={j} size={14} fill={j < latestRating ? "currentColor" : "none"} aria-hidden="true" />
                        ))}
                        <span className="text-gray-400 text-xs ml-1">{latestRating} / 5</span>
                    </p>
                )}
            </div>
        </div>
    )
}
