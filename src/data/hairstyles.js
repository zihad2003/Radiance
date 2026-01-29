// Comprehensive Hairstyle Database for Radiance
const femaleWaves = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600";

export const faceShapesData = {
    oval: {
        description: "Balanced proportions with a slightly narrower jawline than the forehead.",
        tips: "Almost any hairstyle works for you. Avoid styles that cover too much of your face.",
        confidence: 0.95
    },
    round: {
        description: "Length and width are almost equal, with soft features and full cheeks.",
        tips: "Go for styles with height/volume at the crown to elongate the face. Longer layers work best.",
        confidence: 0.92
    },
    square: {
        description: "Strong, wide forehead and a prominent, sharp jawline.",
        tips: "Soften the corners of your face with layers, side-swept bangs, or long waves.",
        confidence: 0.88
    },
    heart: {
        description: "Wide forehead and cheekbones that taper down to a narrow, pointed chin.",
        tips: "Balance the narrow chin with volume at the jawline. Side parts and curtain bangs look great.",
        confidence: 0.90
    },
    diamond: {
        description: "Narrow forehead and chin with wide cheekbones (the widest part of the face).",
        tips: "Show off those cheekbones! Chin-length bobs or wispy bangs are excellent choices.",
        confidence: 0.85
    },
    oblong: {
        description: "Face is longer than it is wide, with a straight cheekline.",
        tips: "Add width with volume on the sides and bangs to shorten the face length visually.",
        confidence: 0.87
    },
    triangle: {
        description: "Narrow forehead with a wide, prominent jawline.",
        tips: "Add volume to the top of the head/forehead area to balance the wider jawline.",
        confidence: 0.82
    }
};

export const hairstyles = [
    // --- WOMEN: LONG (15 STYLES) ---
    {
        id: "w_long_1",
        name: "Straight Layered Long",
        gender: "female",
        faceShapes: ["oval", "round", "square"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["casual", "low-maintenance"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_long_2",
        name: "Beach Waves Long",
        gender: "female",
        faceShapes: ["oval", "heart", "square", "diamond"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["trendy", "voluminous"],
        maintenance: "medium",
        difficulty: "intermediate",
        trending: true
    },
    {
        id: "w_long_3",
        name: "Sleek Middle Part",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["professional", "chic"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_long_4",
        name: "Layered Waves Highlights",
        gender: "female",
        faceShapes: ["oval", "square", "oblong"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["glam", "volume"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_long_5",
        name: "Boho Braided Long",
        gender: "female",
        faceShapes: ["oval", "heart", "diamond"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["boho", "romantic"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_long_6",
        name: "Mermaid Waves",
        gender: "female",
        faceShapes: ["oval", "round", "square"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["summer", "extra"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_long_7",
        name: "Long Side Bangs",
        gender: "female",
        faceShapes: ["oval", "heart", "oblong"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["classic", "soft"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_long_8",
        name: "Waterfall Braid",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["braid", "complex"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_long_9",
        name: "High Sleek Ponytail",
        gender: "female",
        faceShapes: ["oval", "round", "diamond"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["fierce", "sporty"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_long_10",
        name: "Half-Up Wavy",
        gender: "female",
        faceShapes: ["oval", "heart", "square"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["versatile", "cute"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_long_11",
        name: "Curtain Bangs Long",
        gender: "female",
        faceShapes: ["oval", "round", "square", "oblong"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["trendy", "framing"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_long_12",
        name: "Loose Curls Long",
        gender: "female",
        faceShapes: ["oval", "square", "diamond"],
        texture: "curly",
        length: "long",
        image: femaleWaves,
        tags: ["glam", "soft"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_long_13",
        name: "Straight Blunt Cut",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["modern", "minimalist"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_long_14",
        name: "Layered Fringe Long",
        gender: "female",
        faceShapes: ["oval", "oblong"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["retro", "trendy"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_long_15",
        name: "Goddess Braids",
        gender: "female",
        faceShapes: ["oval", "round", "heart", "square", "diamond"],
        texture: "curly",
        length: "long",
        image: femaleWaves,
        tags: ["traditional", "bold"],
        maintenance: "high",
        difficulty: "expert"
    },

    // --- WOMEN: MEDIUM (15 STYLES) ---
    {
        id: "w_med_1",
        name: "Shoulder Bob",
        gender: "female",
        faceShapes: ["oval", "heart"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["professional", "chic"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_med_2",
        name: "Textured Lob",
        gender: "female",
        faceShapes: ["round", "oval", "heart", "square"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["modern", "versatile"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_med_3",
        name: "Layered Medium Waves",
        gender: "female",
        faceShapes: ["oval", "square", "diamond"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["voluminous", "soft"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_med_4",
        name: "Blunt Cut Medium",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["sleek", "modern"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_med_5",
        name: "Shaggy Medium",
        gender: "female",
        faceShapes: ["oval", "square", "oblong"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["retro", "trendy"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_med_6",
        name: "A-Line Bob",
        gender: "female",
        faceShapes: ["oval", "round", "heart"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["sharp", "edge"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_med_7",
        name: "Curly Medium",
        gender: "female",
        faceShapes: ["oval", "square", "diamond", "triangle"],
        texture: "curly",
        length: "medium",
        image: femaleWaves,
        tags: ["natural", "bounce"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_med_8",
        name: "Medium Side Part",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["classic", "office"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_med_9",
        name: "Layered Highlights Med",
        gender: "female",
        faceShapes: ["oval", "square", "oblong"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["dynamic", "glam"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_med_10",
        name: "Beachy Waves Med",
        gender: "female",
        faceShapes: ["round", "oval", "heart", "square"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["summer", "relaxed"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_med_11",
        name: "Curtain Bangs Med",
        gender: "female",
        faceShapes: ["oval", "round", "square", "oblong"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["trendy", "soft"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_med_12",
        name: "Choppy Layers Med",
        gender: "female",
        faceShapes: ["oval", "square", "diamond"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["edgy", "textured"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_med_13",
        name: "Sleek Med Straight",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["minimalist", "clean"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_med_14",
        name: "Wispy Bangs Med",
        gender: "female",
        faceShapes: ["oval", "heart", "oblong"],
        texture: "straight",
        length: "medium",
        image: femaleWaves,
        tags: ["youthful", "cute"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_med_15",
        name: "Braided Crown Med",
        gender: "female",
        faceShapes: ["oval", "round", "heart"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["romantic", "special"],
        maintenance: "high",
        difficulty: "expert"
    },

    // --- WOMEN: SHORT (12 STYLES) ---
    {
        id: "w_short_1",
        name: "Classic Pixie",
        gender: "female",
        faceShapes: ["oval", "heart", "diamond"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["bold", "low-maintenance"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_short_2",
        name: "Asymmetrical Pixie",
        gender: "female",
        faceShapes: ["round", "oval", "square"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["edgy", "modern"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_short_3",
        name: "Short Bob Bangs",
        gender: "female",
        faceShapes: ["oval", "oblong", "diamond"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["parisian", "chic"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_short_4",
        name: "Textured Crop",
        gender: "female",
        faceShapes: ["oval", "heart", "square"],
        texture: "wavy",
        length: "short",
        image: femaleWaves,
        tags: ["cool", "shaggy"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_short_5",
        name: "Undercut Pixie",
        gender: "female",
        faceShapes: ["oval", "diamond", "square"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["rebellious", "bold"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_short_6",
        name: "Short Wavy Bob",
        gender: "female",
        faceShapes: ["oval", "heart", "round", "square"],
        texture: "wavy",
        length: "short",
        image: femaleWaves,
        tags: ["voluminous", "soft"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_short_7",
        name: "Slicked Back Short",
        gender: "female",
        faceShapes: ["oval", "diamond"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["power", "sleek"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_short_8",
        name: "Side Swept Short",
        gender: "female",
        faceShapes: ["round", "oval", "heart"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["soft", "feminine"],
        maintenance: "medium",
        difficulty: "beginner"
    },
    {
        id: "w_short_9",
        name: "Choppy Short Layers",
        gender: "female",
        faceShapes: ["oval", "square", "diamond"],
        texture: "wavy",
        length: "short",
        image: femaleWaves,
        tags: ["casual", "messy"],
        maintenance: "low",
        difficulty: "beginner"
    },
    {
        id: "w_short_10",
        name: "Curly Short Bob",
        gender: "female",
        faceShapes: ["oval", "square", "heart", "triangle"],
        texture: "curly",
        length: "short",
        image: femaleWaves,
        tags: ["bounce", "playful"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_short_11",
        name: "Feminine Buzzcut",
        gender: "female",
        faceShapes: ["oval", "diamond"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["radical", "minimalist"],
        maintenance: "none",
        difficulty: "beginner"
    },
    {
        id: "w_short_12",
        name: "Short with Fringe",
        gender: "female",
        faceShapes: ["oval", "oblong"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["cute", "bangs"],
        maintenance: "medium",
        difficulty: "beginner"
    },

    // --- WOMEN: BRIDAL/PARTY (8 STYLES) ---
    {
        id: "w_party_1",
        name: "Elegant High Bun",
        gender: "female",
        faceShapes: ["oval", "round", "diamond"],
        texture: "straight",
        length: "updo",
        image: femaleWaves,
        tags: ["bridal", "formal"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_party_2",
        name: "Low Chignon Flowers",
        gender: "female",
        faceShapes: ["oval", "heart", "square"],
        texture: "wavy",
        length: "updo",
        image: femaleWaves,
        tags: ["wedding", "romantic"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_party_3",
        name: "Braided Updo",
        gender: "female",
        faceShapes: ["oval", "round", "heart"],
        texture: "wavy",
        length: "updo",
        image: femaleWaves,
        tags: ["party", "boho"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_party_4",
        name: "Half-Up Crown Braid",
        gender: "female",
        faceShapes: ["oval", "square", "diamond"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["romantic", "elegant"],
        maintenance: "high",
        difficulty: "expert"
    },
    {
        id: "w_party_5",
        name: "Twisted Low Bun",
        gender: "female",
        faceShapes: ["oval", "round", "square"],
        texture: "straight",
        length: "updo",
        image: femaleWaves,
        tags: ["modern", "party"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_party_6",
        name: "Romantic Side Curls",
        gender: "female",
        faceShapes: ["square", "diamond", "oval"],
        texture: "curly",
        length: "long",
        image: femaleWaves,
        tags: ["glam", "wedding"],
        maintenance: "high",
        difficulty: "intermediate"
    },
    {
        id: "w_party_7",
        name: "Messy Boho Bun",
        gender: "female",
        faceShapes: ["oval", "heart", "square"],
        texture: "wavy",
        length: "updo",
        image: femaleWaves,
        tags: ["relaxed", "chic"],
        maintenance: "medium",
        difficulty: "intermediate"
    },
    {
        id: "w_party_8",
        name: "Hollywood Waves",
        gender: "female",
        faceShapes: ["oval", "round", "square", "oblong"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["vintage", "red-carpet"],
        maintenance: "high",
        difficulty: "intermediate"
    }
];

export const hairColors = [
    // Natural Colors
    { name: "Black", hex: "#090806", category: "natural" },
    { name: "Dark Brown", hex: "#2C1B18", category: "natural" },
    { name: "Brown", hex: "#4B352D", category: "natural" },
    { name: "Light Brown", hex: "#634E34", category: "natural" },
    { name: "Golden Blonde", hex: "#D6B87C", category: "natural" },
    { name: "Platinum Blonde", hex: "#EAE1D0", category: "natural" },

    // Fashion Colors
    { name: "Auburn", hex: "#713425", category: "fashion" },
    { name: "Deep Red", hex: "#7E1212", category: "fashion" },
    { name: "Burgundy", hex: "#4E1225", category: "fashion" },
    { name: "Purple", hex: "#3A124E", category: "fashion" },
    { name: "Midnight Blue", hex: "#12194E", category: "fashion" },
    { name: "Pastel Pink", hex: "#E8A7B7", category: "fashion" },
    { name: "Silver", hex: "#BFC1C2", category: "fashion" },

    // Special/Highlights
    { name: "Balayage", hex: "linear-gradient(45deg, #2C1B18, #D6B87C)", category: "highlight" },
    { name: "Ombre", hex: "linear-gradient(to bottom, #2C1B18, #634E34)", category: "highlight" }
];
