import { detectAllergens, isGlutenFree, isAlphaGalSafe, Meal } from "./allergens.ts"
import { AlertTriangle, CheckCircle, Leaf } from "lucide-react"

interface Props {
    meal: Meal
}

const allergenColors: Record<string, string> = {
    "Gluten": "bg-yellow-500 text-black border-yellow-600",
    "Dairy": "bg-blue-500 text-white border-blue-600",
    "Tree Nuts": "bg-red-600 text-white border-red-700",
    "Peanuts": "bg-red-700 text-white border-red-800",
    "Eggs": "bg-orange-400 text-black border-orange-500",
    "Shellfish": "bg-purple-600 text-white border-purple-700",
    "Soy": "bg-green-700 text-white border-green-800",
    "Alpha Gal": "bg-pink-600 text-white border-pink-700",
}

export default function AllergenBadges({ meal }: Props) {
    const allergens = detectAllergens(meal)
    const glutenFree = isGlutenFree(meal)
    const alphaGalSafe = isAlphaGalSafe(meal)

    return (
        <div className="flex flex-wrap gap-2 my-3">
            {allergens.length === 0 && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-green-600 bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
                    <CheckCircle size={13} /> No Common Allergens
                </span>
            )}
            {glutenFree && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-green-600 bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
                    <Leaf size={13} /> Gluten Free
                </span>
            )}
            {alphaGalSafe && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-green-600 bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
                    <CheckCircle size={13} /> Alpha Gal Safe
                </span>
            )}
            {allergens.map(({ label }) => (
                <span
                    key={label}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs font-bold uppercase tracking-wide ${allergenColors[label] ?? "bg-gray-600 text-white border-gray-700"}`}
                >
                    <AlertTriangle size={13} /> ALERT: {label} UNSAFE!
                </span>
            ))}
        </div>
    )
}
