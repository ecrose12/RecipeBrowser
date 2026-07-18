import { Meal } from "./allergens.ts"

interface Substitution {
    keyword: string
    substitute: string
    reason: string
    color: string
}

export interface SubstitutionSuggestion {
    ingredient: string
    substitute: string
    reason: string
    color: string
}

const SUBSTITUTIONS: Substitution[] = [
    // Gluten
    { keyword: "wheat", substitute: "rice flour or almond flour", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "flour", substitute: "gluten-free flour blend or oat flour (certified GF)", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "barley", substitute: "quinoa or buckwheat", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "rye", substitute: "gluten-free oat flour", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "bread", substitute: "gluten-free bread or corn tortillas", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "pasta", substitute: "rice pasta or chickpea pasta", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "noodle", substitute: "rice noodles or zucchini noodles", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "couscous", substitute: "quinoa or cauliflower rice", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },
    { keyword: "semolina", substitute: "gluten-free flour or cornmeal", reason: "Substitution: Gluten Free Safe ", color: "bg-yellow-500 text-black border-yellow-600" },

    // Dairy
    { keyword: "milk", substitute: "oat milk, almond milk, or coconut milk", reason: "Substitution:Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "cheese", substitute: "nutritional yeast or dairy-free cheese", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "butter", substitute: "coconut oil or vegan butter", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "cream", substitute: "coconut cream or cashew cream", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "yogurt", substitute: "coconut yogurt or almond yogurt", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "yoghurt", substitute: "coconut yogurt or almond yogurt", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "ghee", substitute: "coconut oil or olive oil", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "parmesan", substitute: "nutritional yeast", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "mozzarella", substitute: "dairy-free mozzarella", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },
    { keyword: "cheddar", substitute: "dairy-free cheddar", reason: "Substitution: Allergen Safe (Dairy)", color: "bg-blue-500 text-white border-blue-600" },

    // Tree Nuts
    { keyword: "almond", substitute: "sunflower seeds or pumpkin seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "walnut", substitute: "sunflower seeds or hemp seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "cashew", substitute: "sunflower seeds or pumpkin seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "pecan", substitute: "sunflower seeds or pumpkin seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "pistachio", substitute: "pumpkin seeds or sunflower seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "hazelnut", substitute: "sunflower seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "macadamia", substitute: "sunflower seeds or pumpkin seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },
    { keyword: "pine nut", substitute: "sunflower seeds or hemp seeds", reason: "Substitution: Allergen Safe (Tree Nuts)", color: "bg-red-600 text-white border-red-700" },

    // Peanuts
    { keyword: "peanut", substitute: "sunflower seed butter or pumpkin seed butter", reason: "Substitution: Allergen Safe (Peanuts)", color: "bg-red-700 text-white border-red-800" },
    { keyword: "groundnut", substitute: "sunflower seed butter", reason: "Substitution: Allergen Safe (Peanuts)", color: "bg-red-700 text-white border-red-800" },

    // Eggs
    { keyword: "egg", substitute: "flax egg (1 tbsp flaxseed + 3 tbsp water) or applesauce", reason: "Substitution: Allergen Safe (Eggs)", color: "bg-orange-400 text-black border-orange-500" },
    { keyword: "eggs", substitute: "flax egg (1 tbsp flaxseed + 3 tbsp water) or applesauce", reason: "Substitution: Allergen Safe (Eggs)", color: "bg-orange-400 text-black border-orange-500" },

    // Shellfish
    { keyword: "shrimp", substitute: "chicken or hearts of palm", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "crab", substitute: "hearts of palm or artichoke", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "lobster", substitute: "hearts of palm or chicken", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "prawn", substitute: "chicken or hearts of palm", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "scallop", substitute: "hearts of palm or king oyster mushroom", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "clam", substitute: "hearts of palm or artichoke", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "oyster", substitute: "king oyster mushroom", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "mussel", substitute: "hearts of palm", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "squid", substitute: "king oyster mushroom", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    { keyword: "octopus", substitute: "king oyster mushroom", reason: "Substitution: Allergen Safe (Shellfish)", color: "bg-purple-600 text-white border-purple-700" },
    // Soy
    { keyword: "soy", substitute: "coconut aminos", reason: "Substitution: Allergen Safe (Soy)", color: "bg-green-700 text-white border-green-800" },
    { keyword: "tofu", substitute: "tempeh (if soy-free) or chickpea tofu", reason: "Substitution: Allergen Safe (Soy)", color: "bg-green-700 text-white border-green-800" },
    { keyword: "edamame", substitute: "green peas or lima beans", reason: "Substitution: Allergen Safe (Soy)", color: "bg-green-700 text-white border-green-800" },
    { keyword: "miso", substitute: "chickpea miso", reason: "Substitution: Allergen Safe (Soy)", color: "bg-green-700 text-white border-green-800" },
    { keyword: "tempeh", substitute: "lentils or chickpeas", reason: "Substitution: Allergen Safe (Soy)", color: "bg-green-700 text-white border-green-800" },
    // Alpha Gal
    { keyword: "beef", substitute: "chicken, turkey, or salmon", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "pork", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "lamb", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "venison", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "bison", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "veal", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "mutton", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "bacon", substitute: "turkey bacon or coconut bacon", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "ham", substitute: "turkey or chicken", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "sausage", substitute: "chicken sausage or turkey sausage", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "lard", substitute: "coconut oil or avocado oil", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "gelatin", substitute: "agar-agar or pectin", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "suet", substitute: "coconut oil", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "kidney", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "liver", substitute: "chicken liver (if poultry is tolerated)", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "goat", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "rabbit", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "deer", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "elk", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "moose", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "buffalo", substitute: "chicken or turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "mince", substitute: "ground chicken or ground turkey", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "steak", substitute: "chicken breast or salmon fillet", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "ribs", substitute: "chicken ribs or jackfruit", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "chorizo", substitute: "chicken chorizo or turkey chorizo", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "prosciutto", substitute: "turkey prosciutto", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "salami", substitute: "turkey salami", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
    { keyword: "pepperoni", substitute: "turkey pepperoni", reason: "Substitution: Alpha Gal Safe", color: "bg-pink-600 text-white border-pink-700" },
]

export function getSubstitutions(meal: Meal): SubstitutionSuggestion[] {
    const ingredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`] || "")
        .filter(Boolean) as string[]

    const suggestions: SubstitutionSuggestion[] = []
    const seen = new Set<string>()

    for (const ingredient of ingredients) {
        const lower = ingredient.toLowerCase()
        for (const { keyword, substitute, reason, color } of SUBSTITUTIONS) {
            if (lower.includes(keyword) && !seen.has(ingredient)) {
                suggestions.push({ ingredient, substitute, reason, color })
                seen.add(ingredient)
                break
            }
        }
    }

    return suggestions
}
