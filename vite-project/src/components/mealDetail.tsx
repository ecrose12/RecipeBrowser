import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Tag, UtensilsCrossed, ScrollText, Star, ClipboardList, Lightbulb, Home } from "lucide-react"
import AllergenBadges from "./AllergenBadges.tsx"
import FavoriteButton from "./favorites.tsx"
import { getSubstitutions, SubstitutionSuggestion } from "./substitutions.ts"
import { getIngredientSubs, IngredientSubOption } from "./ingredientSubs.ts"
import { convertToUS } from "./conversions.ts"

interface Ingredient {
    ingredient: string
    measure: string
}

interface HistoryEntry {
    rating: number
    comment: string
    timestamp: string
}

interface Meal {
    idMeal: string
    strMeal: string
    strMealThumb: string
    strCategory: string
    strInstructions: string
    strSource?: string
    [key: string]: string | null | undefined
}

function mergeIngredients(meal: Meal): Ingredient[] {
    const pairs: Ingredient[] = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ingredient && ingredient.trim()) {
            pairs.push({ measure: measure ?? "", ingredient })
        }
    }
    return pairs
}

function applySubstitutions(text: string, activeSwaps: Record<string, string>): string {
    let result = text
    for (const [original, substitute] of Object.entries(activeSwaps)) {
        const regex = new RegExp(original, "gi")
        result = result.replace(regex, substitute)
    }
    return result
}

interface MealDetailProps {
    useUS: boolean
}

export default function MealDetail({ useUS }: MealDetailProps) {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [meal, setMeal] = useState<Meal | null>(null)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [activeSwaps, setActiveSwaps] = useState<Record<string, string>>({})
    const [missingMode, setMissingMode] = useState<boolean>(false)
    const [hoveredIngredient, setHoveredIngredient] = useState<string | null>(null)

    const storageKey = `meal-${id}`
    const rawData = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as { history?: HistoryEntry[] }
    const savedHistory: HistoryEntry[] = Array.isArray(rawData.history) ? rawData.history : []

    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>("")
    const [history, setHistory] = useState<HistoryEntry[]>(savedHistory)
    const [saved2, setSaved2] = useState<boolean>(false)

    useEffect(() => {
        async function loadMeal() {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await res.json()
            setMeal(data.meals[0])
        }
        loadMeal()
    }, [id])

    useEffect(() => {
        if (!meal) return
        setIngredients(mergeIngredients(meal))
    }, [meal])

    function toggleSwap(sub: SubstitutionSuggestion) {
        setActiveSwaps((prev) => {
            const updated = { ...prev }
            if (updated[sub.ingredient]) {
                delete updated[sub.ingredient]
            } else {
                updated[sub.ingredient] = sub.substitute.split(",")[0].split(" or ")[0].trim()
            }
            return updated
        })
    }

    function handleSave() {
        const entry: HistoryEntry = {
            rating,
            comment,
            timestamp: new Date().toLocaleString()
        }
        const newHistory = [entry, ...history]
        localStorage.setItem(storageKey, JSON.stringify({ history: newHistory }))
        setHistory(newHistory)
        setRating(0)
        setComment("")
        setSaved2(true)
        setTimeout(() => setSaved2(false), 2000)
    }

    if (!meal) return (
        <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    )

    const substitutions = getSubstitutions(meal)
    const hasActiveSwaps = Object.keys(activeSwaps).length > 0

    const displayedIngredients = ingredients.map(({ ingredient, measure }) => ({
        ingredient: useUS ? convertToUS(applySubstitutions(ingredient, activeSwaps)) : applySubstitutions(ingredient, activeSwaps),
        measure: useUS ? convertToUS(measure) : measure,
    }))

    const displayedInstructions = useUS ? convertToUS(applySubstitutions(meal.strInstructions ?? "", activeSwaps)) : applySubstitutions(meal.strInstructions ?? "", activeSwaps)

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <style>{`
                .custom-toggle { position: relative; display: inline-block; width: 44px; height: 24px; }
                .custom-toggle input { opacity: 0; width: 0; height: 0; }
                .custom-toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; border-radius: 24px; transition: 0.3s; }
                .custom-toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: 0.3s; }
                .custom-toggle input:checked + .custom-toggle-slider { background-color: #22c55e; }
                .custom-toggle input:checked + .custom-toggle-slider:before { transform: translateX(20px); }
            `}</style>

            <div className="flex justify-center">
                <button
                    className="btn btn-ghost btn-sm mb-4 flex items-center gap-1"
                    onClick={() => navigate("/")}
                    aria-label="Go to home page"
                >
                    <Home size={16} /> Home
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-1">{meal.strMeal}</h1>
            <p className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <Tag size={14} /> {meal.strCategory}
            </p>

            <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-xl w-full mb-4" />

            <AllergenBadges meal={meal} />
            <div className="flex justify-center my-3">
                <FavoriteButton meal={meal} />
            </div>

            {substitutions.length > 0 && (
                <div className="bg-base-200 rounded-xl p-4 my-4">
                    <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
                        <Lightbulb size={18} className="text-yellow-400" /> Ingredient Substitution Suggestions
                    </h3>
                    <ul className="flex flex-col gap-4">
                        {substitutions.map((sub, i) => {
                            const isActive = !!activeSwaps[sub.ingredient]
                            return (
                                <li key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${sub.color}`}>{sub.reason}</span>
                                        <span className="text-sm">
                                            <span className="text-gray-400">Replace </span>
                                            <span className={`font-medium ${isActive ? "line-through text-gray-400" : ""}`}>{sub.ingredient}</span>
                                            <span className="text-gray-400"> with </span>
                                            <span className={isActive ? "font-bold text-green-500" : ""}>{sub.substitute}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="custom-toggle">
                                            <input
                                                type="checkbox"
                                                checked={isActive}
                                                onChange={() => toggleSwap(sub)}
                                            />
                                            <span className="custom-toggle-slider"></span>
                                        </label>
                                        <span className="text-xs text-gray-400">
                                            {isActive ? "Substitution applied to recipe" : "Apply substitution to recipe"}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {hasActiveSwaps && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-green-500 font-semibold">
                            <Lightbulb size={14} /> Recipe has been altered with your substitutions
                        </div>
                    )}
                </div>
            )}

            <h2 className="font-semibold text-lg mb-2 flex items-center justify-center gap-2">
                <UtensilsCrossed size={18} /> {hasActiveSwaps ? `${Object.keys(activeSwaps).map(k => substitutions.find(s => s.ingredient === k)?.reason).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(" & ")} Ingredients` : "Ingredients"}
            </h2>
            <ul className="list-disc list-inside mb-6" aria-label="Ingredients list">
                {displayedIngredients.map(({ ingredient, measure }, i) => (
                    <li key={i}>{measure} {ingredient}</li>
                ))}
            </ul>

            <h2 className="font-semibold text-lg mb-2 flex items-center justify-center gap-2">
                <ScrollText size={18} /> {hasActiveSwaps ? `${Object.keys(activeSwaps).map(k => substitutions.find(s => s.ingredient === k)?.reason).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(" & ")} Instructions` : "Instructions"}
            </h2>
            <p className="text-sm whitespace-pre-line mb-6">{displayedInstructions}</p>

            <div className="divider font-bold uppercase tracking-wide text-xs">
                <ClipboardList size={16} /> Ratings and Comments
            </div>

            <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star === rating ? 0 : star)}
                        aria-label={`${star === rating ? "Remove" : "Set"} rating to ${star} star${star !== 1 ? "s" : ""}`}
                    >
                        <Star
                            size={24}
                            fill={star <= rating ? "currentColor" : "none"}
                            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                        />
                    </button>
                ))}
            </div>

            <textarea
                id={`comment-${id}`}
                className="textarea textarea-bordered w-full mb-2 border-2"
                placeholder="Leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-blue-500 text-white text-xs font-bold uppercase tracking-wide hover:bg-blue-600 transition-colors mb-6"
                onClick={handleSave}
            >
                {saved2 ? "Saved!" : "Save"}
            </button>

            {history.length > 0 && (
                <>
                    <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ScrollText size={18} /> History
                    </h2>
                    <ul className="flex flex-col gap-3">
                        {history.map((entry, i) => (
                            <li key={i} className="bg-base-200 rounded-full px-4 py-3 border-2 border-base-300">
                                <p className="flex items-center gap-1 text-yellow-400 text-sm">
                                    {Array.from({ length: 5 }, (_, j) => (
                                        <Star key={j} size={14} fill={j < entry.rating ? "currentColor" : "none"} />
                                    ))}
                                </p>
                                {entry.comment && <p className="text-sm mt-1">{entry.comment}</p>}
                                <p className="text-xs text-gray-400 mt-1">{entry.timestamp}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {meal.strSource && (
                <div className="flex justify-center mt-8 mb-4">
                    <a href={meal.strSource} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 text-blue-500 text-xs font-bold uppercase tracking-wide hover:bg-blue-500 hover:text-white transition-colors">
                        View Original Recipe
                    </a>
                </div>
            )}
        </div>
    )
}
