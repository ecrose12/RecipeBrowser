import { useEffect, useState } from "react"
import { Search, Filter } from "lucide-react"
import MealList from "./mealList.tsx"
import { detectAllergens, Meal } from "./allergens.ts"
import { getSubstitutions } from "./substitutions.ts"

type FilterBy =
    | "name"
    | "category"
    | "ingredient"
    | "avoid-ingredient"
    | "avoid-allergen"
    | "gluten-free"
    | "alpha-gal-safe"
    | "rating"
    | "favorites"

interface HistoryEntry {
    rating: number
    comment: string
    timestamp: string
}

interface SavedData {
    history?: HistoryEntry[]
}

const placeholders: Record<FilterBy, string> = {
    name: "Search by name...",
    category: "Search by category...",
    ingredient: "Search by ingredient...",
    "avoid-ingredient": "Enter ingredient to avoid...",
    "avoid-allergen": "e.g. Gluten, Dairy, Peanuts...",
    "gluten-free": "",
    "alpha-gal-safe": "",
    "favorites": "",
    rating: "Min stars (1-5)...",
}

const noSearchBox: FilterBy[] = ["gluten-free", "alpha-gal-safe", "favorites"]
const allergenFilters: FilterBy[] = ["avoid-allergen", "gluten-free", "alpha-gal-safe"]

function hasSubstitutionForAllergen(meal: Meal, allergenLabel: string): boolean {
    const subs = getSubstitutions(meal)
    const allergenMap: Record<string, string> = {
        "Gluten": "Gluten Free Substitute",
        "Alpha Gal": "Alpha Gal Substitute",
        "Dairy": "Allergen Substitute (Dairy)",
        "Tree Nuts": "Allergen Substitute (Tree Nuts)",
        "Peanuts": "Allergen Substitute (Peanuts)",
        "Eggs": "Allergen Substitute (Eggs)",
        "Shellfish": "Allergen Substitute (Shellfish)",
        "Soy": "Allergen Substitute (Soy)",
    }
    const reasonToMatch = allergenMap[allergenLabel]
    return subs.some((s) => s.reason === reasonToMatch)
}

export default function Body({ data, useUS }: { data?: string; useUS?: boolean }) {
    const [query, setQuery] = useState<string>("")
    const [filterBy, setFilterBy] = useState<FilterBy>("name")
    const [includeSubs, setIncludeSubs] = useState<boolean>(false)
    const [meals, setMeals] = useState<Meal[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function loadMeals(): Promise<void> {
            try {
                const letters = "abcdefghijklmnopqrstuvwxyz".split("")
                const results = await Promise.all(
                    letters.map((letter) =>
                        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                            .then((r) => r.json())
                            .then((d) => (d.meals || []) as Meal[])
                    )
                )
                const allMeals = results.flat()
                const unique = Array.from(new Map(allMeals.map((m) => [m.idMeal, m])).values())
                setMeals(unique)
            } catch (err) {
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        }
        loadMeals()
    }, [])

    function getFilteredMeals(): Meal[] {
        if (filterBy === "favorites") {
            const favs = JSON.parse(localStorage.getItem("favorites") ?? "[]") as string[]
            return meals.filter((meal) => favs.includes(meal.idMeal))
        }
        if (filterBy === "gluten-free") {
            return meals.filter((meal) => {
                const isGlutenFree = !detectAllergens(meal).some((a) => a.label === "Gluten")
                if (isGlutenFree) return true
                if (includeSubs) return hasSubstitutionForAllergen(meal, "Gluten")
                return false
            })
        }
        if (filterBy === "alpha-gal-safe") {
            return meals.filter((meal) => {
                const isAlphaGalSafe = !detectAllergens(meal).some((a) => a.label === "Alpha Gal")
                if (isAlphaGalSafe) return true
                if (includeSubs) return hasSubstitutionForAllergen(meal, "Alpha Gal")
                return false
            })
        }
        if (!query) return meals
        if (filterBy === "name") {
            return meals.filter((meal) => meal.strMeal.toLowerCase().includes(query.toLowerCase()))
        }
        if (filterBy === "category") {
            return meals.filter((meal) => meal.strCategory.toLowerCase().includes(query.toLowerCase()))
        }
        if (filterBy === "ingredient") {
            return meals.filter((meal) =>
                Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
                    .filter(Boolean)
                    .some((ingredient) => (ingredient as string).toLowerCase().includes(query.toLowerCase()))
            )
        }
        if (filterBy === "avoid-ingredient") {
            return meals.filter((meal) =>
                !Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
                    .filter(Boolean)
                    .some((ingredient) => (ingredient as string).toLowerCase().includes(query.toLowerCase()))
            )
        }
        if (filterBy === "avoid-allergen") {
            return meals.filter((meal) => {
                const allergens = detectAllergens(meal)
                const hasAllergen = allergens.some((a) => a.label.toLowerCase().includes(query.toLowerCase()))
                if (!hasAllergen) return true
                if (includeSubs) {
                    const matchedAllergen = allergens.find((a) => a.label.toLowerCase().includes(query.toLowerCase()))
                    if (matchedAllergen) return hasSubstitutionForAllergen(meal, matchedAllergen.label)
                }
                return false
            })
        }
        if (filterBy === "rating") {
            const minRating = parseInt(query)
            if (isNaN(minRating)) return meals
            return meals.filter((meal) => {
                const saved = JSON.parse(localStorage.getItem(`meal-${meal.idMeal}`) ?? "{}") as SavedData
                const latest = saved.history?.[0]?.rating ?? 0
                return latest >= minRating
            })
        }
        return meals
    }

    const showCheckbox = allergenFilters.includes(filterBy)
    const isFiltered = filterBy !== "name" || query !== ""

    const checkboxLabel =
        filterBy === "gluten-free" ? "Include recipes with gluten substitutions available" :
        filterBy === "alpha-gal-safe" ? "Include recipes with Alpha Gal substitutions available" :
        "Include recipes with substitutions available for this allergen"

    return (
        <div className="h-1/2 m-auto">
            <div className="flex gap-2 mb-4 mt-4 items-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-base-300 bg-base-100 text-base-content text-xs font-bold uppercase tracking-wide hover:bg-base-200 transition-colors">
                    <Filter size={14} />
                    <select
                        id="filter-by" aria-label="Filter recipes by"
                        className="bg-transparent outline-none text-xs font-bold uppercase tracking-wide"
                        value={filterBy}
                        onChange={(e) => { setFilterBy(e.target.value as FilterBy); setQuery(""); setIncludeSubs(false) }}
                    >
                        <optgroup label="Search By">
                            <option value="favorites">Favorites</option>
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="ingredient">Ingredient</option>
                            <option value="rating">Min Rating</option>
                        </optgroup>
                        <optgroup label="Allergens">
                            <option value="gluten-free">Gluten Free Only</option>
                            <option value="alpha-gal-safe">Alpha Gal Safe</option>
                        </optgroup>
                        <optgroup label="Ingredients">
                            <option value="avoid-ingredient">Avoid Ingredient</option>
                        </optgroup>
                    </select>
                </div>
                {!noSearchBox.includes(filterBy) && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-base-300 bg-base-100 text-base-content w-full hover:border-blue-500 transition-colors">
                        <Search size={16} className="text-gray-400" />
                        <input
                            type={filterBy === "rating" ? "number" : "text"}
                            id="meal-search" aria-label="Search recipes"
                            className="w-full outline-none bg-transparent text-sm text-base-content"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholders[filterBy]}
                            min={filterBy === "rating" ? 1 : undefined}
                            max={filterBy === "rating" ? 5 : undefined}
                        />
                    </div>
                )}
            </div>
            {isFiltered && (
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-red-400 text-red-400 text-xs font-bold uppercase tracking-wide hover:bg-red-400 hover:text-white transition-colors whitespace-nowrap"
                    onClick={() => { setFilterBy("name"); setQuery(""); setIncludeSubs(false) }}
                >
                    Clear Filter
                </button>
            )}

            {showCheckbox && (
                <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-xl border border-base-300 bg-base-200">
                    <input
                        type="checkbox"
                        id="include-subs" aria-label="Include recipes with substitutions"
                        checked={includeSubs}
                        onChange={(e) => setIncludeSubs(e.target.checked)}
                        className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="include-subs" className="text-sm text-base-content cursor-pointer flex-1">
                        {checkboxLabel}
                    </label>
                    {includeSubs && (
                        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border-2 border-blue-400 bg-blue-100 text-blue-800 whitespace-nowrap">
                            💡 Subs included
                        </span>
                    )}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : error ? (
                <p>Error: There was an error loading the meals.</p>
            ) : (
                <MealList meals={getFilteredMeals()} query={query} useUS={useUS ?? false} />
            )}
        </div>
    )
}
