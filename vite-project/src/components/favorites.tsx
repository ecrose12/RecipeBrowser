import { useState } from "react"
import { Heart } from "lucide-react"
import { Meal } from "./allergens.ts"

interface Props {
    meal: Meal
}

export function getFavorites(): string[] {
    return JSON.parse(localStorage.getItem("favorites") ?? "[]")
}

export function isFavorited(idMeal: string): boolean {
    return getFavorites().includes(idMeal)
}

export function toggleFavorite(idMeal: string): boolean {
    const favs = getFavorites()
    const idx = favs.indexOf(idMeal)
    if (idx === -1) {
        favs.push(idMeal)
    } else {
        favs.splice(idx, 1)
    }
    localStorage.setItem("favorites", JSON.stringify(favs))
    return favs.includes(idMeal)
}

export default function FavoriteButton({ meal }: Props) {
    const [favorited, setFavorited] = useState<boolean>(() => isFavorited(meal.idMeal))

    function handleFavorite() {
        setFavorited(toggleFavorite(meal.idMeal))
    }

    return (
        <button
            onClick={handleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                favorited
                    ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "border-base-300 text-base-content hover:bg-base-200"
            }`}
        >
            <Heart size={16} fill={favorited ? "currentColor" : "none"} />
            {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
    )
}
