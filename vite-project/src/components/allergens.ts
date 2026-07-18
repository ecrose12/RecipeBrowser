export interface Allergen {
    label: string
    color: string
    keywords: string[]
}

export interface Meal {
    idMeal: string
    strMeal: string
    strMealThumb: string
    strCategory: string
    strInstructions: string
    strSource?: string
    [key: string]: string | null | undefined
}

const ALLERGENS: Allergen[] = [
    {
        label: "Gluten",
        color: "badge-warning",
        keywords: ["wheat", "flour", "barley", "rye", "bread", "pasta", "noodle", "couscous", "semolina"]
    },
    {
        label: "Dairy",
        color: "badge-info",
        keywords: ["milk", "cheese", "butter", "cream", "yogurt", "yoghurt", "ghee", "parmesan", "mozzarella", "cheddar"]
    },
    {
        label: "Tree Nuts",
        color: "badge-error",
        keywords: ["almond", "walnut", "cashew", "pecan", "pistachio", "hazelnut", "macadamia", "chestnut", "pine nut"]
    },
    {
        label: "Peanuts",
        color: "badge-error",
        keywords: ["peanut", "groundnut"]
    },
    {
        label: "Eggs",
        color: "badge-secondary",
        keywords: ["egg", "eggs"]
    },
    {
        label: "Shellfish",
        color: "badge-accent",
        keywords: ["shrimp", "crab", "lobster", "prawn", "scallop", "clam", "oyster", "mussel", "squid", "octopus"]
    },
    {
        label: "Soy",
        color: "badge-primary",
        keywords: ["soy", "tofu", "edamame", "miso", "tempeh"]
    },
    {
        label: "Alpha Gal",
        color: "badge-neutral",
        keywords: [
            "beef", "pork", "lamb", "venison", "bison", "veal", "mutton",
            "bacon", "ham", "sausage", "lard", "gelatin", "suet", "kidney",
            "liver", "offal", "game", "goat", "rabbit", "deer", "elk",
            "moose", "buffalo", "mince", "steak", "ribs", "chorizo",
            "prosciutto", "salami", "pepperoni"
        ]
    },
]

export function detectAllergens(meal: Meal): Allergen[] {
    const ingredients = Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`] || "")
        .filter(Boolean)
        .map((i) => i.toLowerCase())

    return ALLERGENS.filter(({ keywords }) =>
        keywords.some((kw) => ingredients.some((ing) => ing.includes(kw)))
    )
}

export function isGlutenFree(meal: Meal): boolean {
    return !detectAllergens(meal).some((a) => a.label === "Gluten")
}

export function isAlphaGalSafe(meal: Meal): boolean {
    return !detectAllergens(meal).some((a) => a.label === "Alpha Gal")
}
