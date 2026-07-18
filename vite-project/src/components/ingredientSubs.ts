export interface IngredientSubOption {
    substitute: string
    note?: string
}

export interface IngredientSubEntry {
    keywords: string[]
    substitutes: IngredientSubOption[]
}

const INGREDIENT_SUBS: IngredientSubEntry[] = [
    // Dairy
    { keywords: ["butter"], substitutes: [{ substitute: "Coconut Oil", note: "1:1 ratio" }, { substitute: "Olive Oil", note: "3/4 amount" }, { substitute: "Applesauce", note: "for baking" }] },
    { keywords: ["milk"], substitutes: [{ substitute: "Oat Milk", note: "1:1 ratio" }, { substitute: "Almond Milk", note: "1:1 ratio" }, { substitute: "Coconut Milk", note: "richer flavor" }] },
    { keywords: ["cream", "heavy cream"], substitutes: [{ substitute: "Coconut Cream", note: "1:1 ratio" }, { substitute: "Greek Yogurt", note: "lighter option" }, { substitute: "Evaporated Milk", note: "1:1 ratio" }] },
    { keywords: ["cheese"], substitutes: [{ substitute: "Nutritional Yeast", note: "for flavor" }, { substitute: "Dairy-Free Cheese", note: "1:1 ratio" }, { substitute: "Tofu", note: "crumbled" }] },
    { keywords: ["yogurt", "yoghurt"], substitutes: [{ substitute: "Sour Cream", note: "1:1 ratio" }, { substitute: "Coconut Yogurt", note: "1:1 ratio" }, { substitute: "Buttermilk", note: "use less" }] },
    { keywords: ["parmesan"], substitutes: [{ substitute: "Nutritional Yeast", note: "3 tbsp per 1/4 cup" }, { substitute: "Pecorino Romano", note: "1:1 ratio" }, { substitute: "Asiago", note: "1:1 ratio" }] },
    { keywords: ["mozzarella"], substitutes: [{ substitute: "Provolone", note: "1:1 ratio" }, { substitute: "Monterey Jack", note: "1:1 ratio" }, { substitute: "Dairy-Free Mozzarella", note: "1:1 ratio" }] },

    // Eggs
    { keywords: ["egg", "eggs"], substitutes: [{ substitute: "Flax Egg", note: "1 tbsp flax + 3 tbsp water" }, { substitute: "Applesauce", note: "1/4 cup per egg" }, { substitute: "Banana", note: "1/2 mashed per egg" }] },

    // Flour & Grains
    { keywords: ["flour", "all-purpose flour"], substitutes: [{ substitute: "Almond Flour", note: "1:1 for most recipes" }, { substitute: "Oat Flour", note: "1:1 ratio" }, { substitute: "Rice Flour", note: "1:1 ratio" }] },
    { keywords: ["breadcrumbs", "bread crumbs"], substitutes: [{ substitute: "Crushed Crackers", note: "1:1 ratio" }, { substitute: "Rolled Oats", note: "1:1 ratio" }, { substitute: "Crushed Cornflakes", note: "1:1 ratio" }] },
    { keywords: ["pasta"], substitutes: [{ substitute: "Rice Noodles", note: "1:1 ratio" }, { substitute: "Zucchini Noodles", note: "lighter option" }, { substitute: "Chickpea Pasta", note: "more protein" }] },
    { keywords: ["rice"], substitutes: [{ substitute: "Quinoa", note: "more protein" }, { substitute: "Cauliflower Rice", note: "lower carb" }, { substitute: "Couscous", note: "1:1 ratio" }] },
    { keywords: ["bread"], substitutes: [{ substitute: "Lettuce Wraps", note: "for sandwiches" }, { substitute: "Gluten-Free Bread", note: "1:1 ratio" }, { substitute: "Corn Tortillas", note: "for wraps" }] },

    // Proteins
    { keywords: ["beef", "ground beef", "mince"], substitutes: [{ substitute: "Ground Turkey", note: "1:1 ratio" }, { substitute: "Ground Chicken", note: "1:1 ratio" }, { substitute: "Lentils", note: "for texture" }] },
    { keywords: ["chicken"], substitutes: [{ substitute: "Turkey", note: "1:1 ratio" }, { substitute: "Tofu", note: "marinate first" }, { substitute: "Chickpeas", note: "for stews" }] },
    { keywords: ["pork"], substitutes: [{ substitute: "Chicken", note: "1:1 ratio" }, { substitute: "Turkey", note: "1:1 ratio" }, { substitute: "Tempeh", note: "for stir-fry" }] },
    { keywords: ["lamb"], substitutes: [{ substitute: "Beef", note: "1:1 ratio" }, { substitute: "Chicken", note: "1:1 ratio" }, { substitute: "Portobello Mushroom", note: "for texture" }] },
    { keywords: ["bacon"], substitutes: [{ substitute: "Turkey Bacon", note: "1:1 ratio" }, { substitute: "Coconut Bacon", note: "smoky flavor" }, { substitute: "Smoked Tempeh", note: "vegan option" }] },
    { keywords: ["shrimp", "prawns"], substitutes: [{ substitute: "Scallops", note: "1:1 ratio" }, { substitute: "Hearts of Palm", note: "vegan option" }, { substitute: "Chicken", note: "1:1 ratio" }] },
    { keywords: ["salmon"], substitutes: [{ substitute: "Tuna", note: "1:1 ratio" }, { substitute: "Trout", note: "similar flavor" }, { substitute: "Cod", note: "milder flavor" }] },

    // Oils & Fats
    { keywords: ["olive oil"], substitutes: [{ substitute: "Avocado Oil", note: "1:1 ratio" }, { substitute: "Coconut Oil", note: "1:1 ratio" }, { substitute: "Vegetable Oil", note: "1:1 ratio" }] },
    { keywords: ["vegetable oil", "sunflower oil"], substitutes: [{ substitute: "Canola Oil", note: "1:1 ratio" }, { substitute: "Avocado Oil", note: "1:1 ratio" }, { substitute: "Melted Coconut Oil", note: "1:1 ratio" }] },
    { keywords: ["lard"], substitutes: [{ substitute: "Coconut Oil", note: "1:1 ratio" }, { substitute: "Butter", note: "1:1 ratio" }, { substitute: "Vegetable Shortening", note: "1:1 ratio" }] },

    // Sweeteners
    { keywords: ["sugar"], substitutes: [{ substitute: "Honey", note: "use 3/4 amount" }, { substitute: "Maple Syrup", note: "use 3/4 amount" }, { substitute: "Coconut Sugar", note: "1:1 ratio" }] },
    { keywords: ["honey"], substitutes: [{ substitute: "Maple Syrup", note: "1:1 ratio" }, { substitute: "Agave Nectar", note: "1:1 ratio" }, { substitute: "Brown Sugar", note: "use more liquid" }] },
    { keywords: ["brown sugar"], substitutes: [{ substitute: "Coconut Sugar", note: "1:1 ratio" }, { substitute: "White Sugar + Molasses", note: "1 tbsp molasses per cup" }, { substitute: "Maple Syrup", note: "use less" }] },

    // Vegetables
    { keywords: ["onion"], substitutes: [{ substitute: "Shallots", note: "milder flavor" }, { substitute: "Leeks", note: "1:1 ratio" }, { substitute: "Onion Powder", note: "1 tsp per medium onion" }] },
    { keywords: ["garlic"], substitutes: [{ substitute: "Garlic Powder", note: "1/8 tsp per clove" }, { substitute: "Shallots", note: "milder flavor" }, { substitute: "Garlic Salt", note: "reduce other salt" }] },
    { keywords: ["tomato", "tomatoes"], substitutes: [{ substitute: "Roasted Red Peppers", note: "similar texture" }, { substitute: "Canned Tomatoes", note: "1:1 ratio" }, { substitute: "Sun-Dried Tomatoes", note: "more intense" }] },
    { keywords: ["spinach"], substitutes: [{ substitute: "Kale", note: "cook longer" }, { substitute: "Swiss Chard", note: "1:1 ratio" }, { substitute: "Arugula", note: "peppery flavor" }] },
    { keywords: ["mushroom", "mushrooms"], substitutes: [{ substitute: "Zucchini", note: "similar texture" }, { substitute: "Eggplant", note: "hearty texture" }, { substitute: "Sun-Dried Tomatoes", note: "umami flavor" }] },
    { keywords: ["potato", "potatoes"], substitutes: [{ substitute: "Sweet Potato", note: "1:1 ratio" }, { substitute: "Cauliflower", note: "lower carb" }, { substitute: "Turnip", note: "1:1 ratio" }] },

    // Liquids & Condiments
    { keywords: ["wine", "white wine", "red wine"], substitutes: [{ substitute: "Grape Juice", note: "add splash of vinegar" }, { substitute: "Chicken/Beef Stock", note: "1:1 ratio" }, { substitute: "Apple Cider Vinegar", note: "use less" }] },
    { keywords: ["soy sauce"], substitutes: [{ substitute: "Coconut Aminos", note: "1:1 ratio" }, { substitute: "Tamari", note: "gluten-free option" }, { substitute: "Worcestershire Sauce", note: "use less" }] },
    { keywords: ["lemon juice"], substitutes: [{ substitute: "Lime Juice", note: "1:1 ratio" }, { substitute: "White Wine Vinegar", note: "use half amount" }, { substitute: "Orange Juice", note: "sweeter flavor" }] },
    { keywords: ["vinegar"], substitutes: [{ substitute: "Lemon Juice", note: "1:1 ratio" }, { substitute: "White Wine", note: "1:1 ratio" }, { substitute: "Apple Cider Vinegar", note: "1:1 ratio" }] },
    { keywords: ["stock", "broth"], substitutes: [{ substitute: "Water + Bouillon Cube", note: "1:1 ratio" }, { substitute: "Vegetable Stock", note: "1:1 ratio" }, { substitute: "Water", note: "add extra seasoning" }] },

    // Spices & Herbs
    { keywords: ["cumin"], substitutes: [{ substitute: "Chili Powder", note: "use half amount" }, { substitute: "Caraway Seeds", note: "1:1 ratio" }, { substitute: "Coriander", note: "similar warmth" }] },
    { keywords: ["coriander", "cilantro"], substitutes: [{ substitute: "Parsley", note: "1:1 ratio" }, { substitute: "Basil", note: "different flavor" }, { substitute: "Cumin", note: "for ground coriander" }] },
    { keywords: ["paprika"], substitutes: [{ substitute: "Cayenne Pepper", note: "use less — hotter" }, { substitute: "Chili Powder", note: "1:1 ratio" }, { substitute: "Ancho Chili Powder", note: "smoky flavor" }] },
    { keywords: ["ginger"], substitutes: [{ substitute: "Ground Ginger", note: "1/4 tsp per 1 tbsp fresh" }, { substitute: "Allspice", note: "use less" }, { substitute: "Cinnamon + Nutmeg", note: "pinch of each" }] },
    { keywords: ["cinnamon"], substitutes: [{ substitute: "Nutmeg", note: "use half amount" }, { substitute: "Allspice", note: "use half amount" }, { substitute: "Cardamom", note: "different flavor" }] },
]

export function getIngredientSubs(ingredient: string): IngredientSubOption[] {
    const lower = ingredient.toLowerCase()
    for (const entry of INGREDIENT_SUBS) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return entry.substitutes
        }
    }
    return []
}
