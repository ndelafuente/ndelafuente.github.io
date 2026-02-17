const chapters = {
    0: {
        "title": "Front matter",
        "page": 0
    },
    1: {
        "title": "Welcome to the Bronx",
        "page": 24
    },
    2: {
        "title": "African Roots",
        "page": 72
    },
    3: {
        "title": "The Bronx to the World Durag Diplomacy",
        "page": 124
    },
    4: {
        "title": "Rebels with a Cause",
        "page": 172
    },
    5: {
        "title": "Dear Mama",
        "page": 216
    },
    6: {
        "title": "Eyes on the Prize",
        "page": 248
    }
}

export const categories = {
    Savory: "Savory",
    Salads: "Salads",
    Stew: "Stew",
    Drinks: "Drinks",
    Cocktails: "Cocktails",
    Sweet: "Sweet",
}

// Chapter titles added at the end of file
export const recipes = {
    "TRIPLE C'S": {
        "recipe": "Triple C's",
        "alt": "Cornbread, crab salad, caviar",
        "category": categories.Savory,
        "page": 20,
        "chapter_idx": 0,
    },
    "CORNBREAD": {
        "recipe": "Cornbread",
        "category": categories.Savory,
        "page": 20,
        "chapter_idx": 0,
    },
    "CHOPPED STEASE": {
        "recipe": "Chopped Stease",
        "alt": "Chopped cheese",
        "category": categories.Savory,
        "page": 29,
        "chapter_idx": 1,
    },
    "GREEN 'FOR THE MONEY' JUICE": {
        "recipe": "Green 'For the Money' Juice",
        "category": categories.Drinks,
        "page": 32,
        "chapter_idx": 1,
    },
    "COCO LOCO": {
        "recipe": "Coco Loco",
        "alt": "Coconut ice cream",
        "category": categories.Sweet,
        "page": 36,
        "chapter_idx": 1,
    },
    "SEAFOOD CITY": {
        "recipe": "Seafood City",
        "alt": "Fried seafood",
        "category": categories.Savory,
        "page": 41,
        "chapter_idx": 1,
    },
    "JADE'S PALACE": {
        "recipe": "Jade's Palace",
        "alt": "General Tso's Cauliflower",
        "category": categories.Savory,
        "page": 45,
        "chapter_idx": 1,
    },
    "HIGHBRIDGE PLANTAIN PATTY": {
        "recipe": "Highbridge Plantain Patty",
        "category": categories.Savory,
        "page": 53,
        "chapter_idx": 1,
    },
    "LEMMEGETASLICE": {
        "recipe": "Lemmegetaslice",
        "alt": "Pizza",
        "category": categories.Savory,
        "page": 57,
        "chapter_idx": 1,
    },
    "TRIBORO TRES LECHES": {
        "recipe": "Triboro Tres Leches",
        "category": categories.Sweet,
        "page": 60,
        "chapter_idx": 1,
    },
    "NUTCRACKERS": {
        "recipe": "Nutcrackers",
        "discouraged": true,
        "category": categories.Cocktails,
        "page": 64,
        "chapter_idx": 1,
    },
    "BANANA LEAF FISH": {
        "recipe": "Banana Leaf Fish",
        "category": categories.Savory,
        "page": 77,
        "chapter_idx": 2,
    },
    "CALLALOO, WHAT IT DO": {
        "recipe": "Callaloo, What It Do",
        "category": categories.Stew,
        "page": 81,
        "chapter_idx": 2,
    },
    "STEWED SEA BASS AND COU-COU": {
        "recipe": "Stewed Sea Bass and Cou-Cou",
        "category": categories.Stew,
        "page": 85,
        "chapter_idx": 2,
    },
    "RED DRANK": {
        "recipe": "Red Drank",
        "category": categories.Drinks,
        "page": 88,
        "chapter_idx": 2,
    },
    "KING JAFFE JOLLOF": {
        "recipe": "King Jaffe Jollof",
        "alt": "Jollof Rice",
        "category": categories.Savory,
        "page": 92,
        "chapter_idx": 2,
    },
    "MAROON SHROOMS": {
        "recipe": "Maroon Shrooms",
        "alt": "Jerk Mushrooms",
        "category": categories.Savory,
        "page": 96,
        "chapter_idx": 2,
    },
    "TWERK N JERK": {
        "recipe": "Twerk N Jerk",
        "alt": "Jerk Chicken",
        "category": categories.Savory,
        "page": 102,
        "chapter_idx": 2,
    },
    "WHAT'S THE 'YAMS'??": {
        "recipe": "What's the 'Yams'??",
        "category": categories.Savory,
        "page": 112,
        "chapter_idx": 2,
    },
    "CHUFA COQUITO": {
        "recipe": "Chufa Coquito",
        "discouraged": true,
        "category": categories.Cocktails,
        "page": 117,
        "chapter_idx": 2,
    },
    "ROASTED PLANTAIN GELATO": {
        "recipe": "Roasted Plantain Gelato",
        "category": categories.Sweet,
        "page": 120,
        "chapter_idx": 2,
    },
    "CURRY CHICKPEAS": {
        "recipe": "Curry Chickpeas",
        "category": categories.Savory,
        "page": 129,
        "chapter_idx": 3,
    },
    "DHAL PURI ROTI": {
        "recipe": "Dhal Puri Roti",
        "category": categories.Savory,
        "page": 132,
        "chapter_idx": 3,
    },
    "DIGGIN IN THE CURRY (D.I.T.C.) WITH CAULIFLOWER RICE": {
        "recipe": "Diggin in the Curry (D.I.T.C.) with Cauliflower Rice",
        "alt": "Pistachio plantain curry",
        "category": categories.Stew,
        "page": 137,
        "chapter_idx": 3,
    },
    "ON THE MAP-O": {
        "recipe": "On the Map-O",
        "alt": "Mapo tofu",
        "category": categories.Savory,
        "page": 140,
        "chapter_idx": 3,
    },
    "5TH CITY KARAAGE": {
        "recipe": "5th City Karaage",
        "alt": "Chicken karaage",
        "category": categories.Savory,
        "page": 148,
        "chapter_idx": 3,
    },
    "ROASTED BREADFRUIT GNOCCHI": {
        "recipe": "Roasted Breadfruit Gnocchi",
        "page": 153,
        "chapter_idx": 3,
    },
    "SALTFISH TAKOYAKI": {
        "recipe": "Saltfish Takoyaki",
        "page": 156,
        "chapter_idx": 3,
    },
    "LIMONADA DE COCO": {
        "recipe": "Limonada De Coco",
        "category": categories.Drinks,
        "page": 160,
        "chapter_idx": 3,
    },
    "WATERMELON AND PRIMETIME GINGER LIME": {
        "recipe": "Watermelon and Primetime Ginger Lime",
        "category": categories.Salads,
        "page": 165,
        "chapter_idx": 3,
    },
    "COCONUT CEVICHE": {
        "recipe": "Coconut Ceviche",
        "category": categories.Savory,
        "page": 168,
        "chapter_idx": 3,
    },
    "GHETTO GRIOT WITH QUIKLIZ": {
        "recipe": "Ghetto Griot with Quikliz",
        "alt": "Jackfruit griyo and quick pikliz",
        "category": categories.Savory,
        "page": 176,
        "chapter_idx": 4,
    },
    "TOUSSAINT": {
        "recipe": "Toussaint",
        "discouraged": true,
        "category": categories.Cocktails,
        "page": 181,
        "chapter_idx": 4,
    },
    "MOSS BOSS": {
        "recipe": "Moss Boss",
        "category": categories.Drinks,
        "page": 184,
        "chapter_idx": 4,
    },
    "CHILI LIME LIBERATION PASTA": {
        "recipe": "Chili Lime Liberation Pasta",
        "category": categories.Savory,
        "page": 186,
        "chapter_idx": 4,
    },
    "JACK MACK": {
        "recipe": "Jack Mack",
        "alt": "Spanish mackerel confit",
        "category": categories.Savory,
        "page": 190,
        "chapter_idx": 4,
    },
    "STATE GREENS": {
        "recipe": "State Greens",
        "alt": "Collard green salad",
        "category": categories.Salads,
        "page": 194,
        "chapter_idx": 4,
    },
    "PLANTAIN MOLE WITH ROASTED SQUASH": {
        "recipe": "Plantain Mole with Roasted Squash",
        "category": categories.Savory,
        "page": 204,
        "chapter_idx": 4,
    },
    "BLACK POWER WAFFLE": {
        "recipe": "Black Power Waffle",
        "category": categories.Sweet,
        "page": 208,
        "chapter_idx": 4,
    },
    "AMERIKKKAN APPLE PIE": {
        "recipe": "Amerikkkan Apple Pie",
        "category": categories.Sweet,
        "page": 212,
        "chapter_idx": 4,
    },
    "OVERNIGHT COCONUT OATS WITH DATE SYRUP": {
        "recipe": "Overnight Coconut Oats with Date Syrup",
        "category": categories.Sweet,
        "page": 220,
        "chapter_idx": 5,
    },
    "HASH HOUSE": {
        "recipe": "Hash House",
        "alt": "Sweet potato hash",
        "category": categories.Savory,
        "page": 225,
        "chapter_idx": 5,
    },
    "GREENBACKS": {
        "recipe": "Greenbacks",
        "alt": "Stewed collard greens",
        "category": categories.Savory,
        "page": 226,
        "chapter_idx": 5,
    },
    "MOM'S SPAGHETTI": {
        "recipe": "Mom's Spaghetti",
        "category": categories.Savory,
        "page": 227,
        "chapter_idx": 5,
    },
    "STRONG BACK STEW": {
        "recipe": "Strong Back Stew",
        "alt": "Lentil stew with plantain dumplings",
        "category": categories.Stew,
        "page": 231,
        "chapter_idx": 5,
    },
    "WHAT IS THIS, VELVET?": {
        "recipe": "What Is This, Velvet?",
        "alt": "Red velvet cake",
        "category": categories.Sweet,
        "page": 238,
        "chapter_idx": 5,
    },
    "GINGER ME": {
        "recipe": "Ginger Me",
        "alt": "Ginger beer",
        "category": categories.Drinks,
        "page": 243,
        "chapter_idx": 5,
    },
    "I'M THE COLOR PURPLE": {
        "recipe": "I'm the Color Purple",
        "discouraged": true,
        "category": categories.Cocktails,
        "page": 246,
        "chapter_idx": 5,
    },
    "COGNITION": {
        "recipe": "Cognition",
        "alt": "Golden milk",
        "category": categories.Drinks,
        "page": 252,
        "chapter_idx": 6,
    },
    "STEWY NEWTON": {
        "recipe": "Stewy Newton",
        "alt": "Feijoada [Brazilian Black Bean Stew]",
        "category": categories.Stew,
        "page": 254,
        "chapter_idx": 6,
    },
    "GARDEN GREENS": {
        "recipe": "Garden Greens",
        "category": categories.Salads,
        "page": 258,
        "chapter_idx": 6,
    },
    "GINGER GARLIC SPINACH": {
        "recipe": "Ginger Garlic Spinach",
        "category": categories.Savory,
        "page": 262,
        "chapter_idx": 6,
    },
    "MOFONGONES": {
        "recipe": "Mofongones",
        "alt": "Mofongo tostones",
        "category": categories.Savory,
        "page": 270,
        "chapter_idx": 6,
    },
    "PURPLE HAZE PIE": {
        "recipe": "Purple Haze Pie",
        "alt": "Purple sweet potato pie",
        "category": categories.Sweet,
        "page": 274,
        "chapter_idx": 6,
    },
    "GUAVA PIÑA": {
        "recipe": "Guava Piña",
        "alt": "Guava pineapple pie",
        "category": categories.Sweet,
        "page": 276,
        "chapter_idx": 6,
    },
    "WATERMELON GRANITA": {
        "recipe": "Watermelon Granita",
        "category": categories.Sweet,
        "page": 280,
        "chapter_idx": 6,
    }
}

Object.keys(recipes).forEach(key => {
    const idx = recipes[key].chapter_idx;
    recipes[key].chapter = chapters[idx].title;
});
