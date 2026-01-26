import femaleWaves from '../assets/hairstyles/female_long_waves.png';
import maleUndercut from '../assets/hairstyles/male_undercut.png';

export const hairstyles = [
    // --- FEMALE STYLES (35) ---
    {
        id: "female_long_waves",
        name: "Long Beach Waves",
        gender: "female",
        faceShapes: ["oval", "heart", "square"],
        texture: "wavy",
        length: "long",
        image: femaleWaves,
        tags: ["casual", "trendy", "voluminous"]
    },
    {
        id: "female_bob_classic",
        name: "Classic Bob",
        gender: "female",
        faceShapes: ["oval", "heart"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["professional", "chic"]
    },
    {
        id: "female_layered_curls",
        name: "Layered Curls",
        gender: "female",
        faceShapes: ["square", "diamond", "oval"],
        texture: "curly",
        length: "medium",
        image: femaleWaves,
        tags: ["glam", "volume"]
    },
    {
        id: "female_bangs_straight",
        name: "Straight with Bangs",
        gender: "female",
        faceShapes: ["oval", "oblong"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["cute", "youthful"]
    },
    {
        id: "female_bridal_bun",
        name: "Bengali Bridal Bun",
        gender: "female",
        faceShapes: ["round", "oval", "heart", "square", "diamond", "oblong"],
        texture: "straight",
        length: "updo",
        image: femaleWaves,
        tags: ["wedding", "traditional", "elegant"]
    },
    {
        id: "female_pixie",
        name: "Pixie Cut",
        gender: "female",
        faceShapes: ["oval", "heart"],
        texture: "straight",
        length: "short",
        image: femaleWaves,
        tags: ["bold", "low-maintenance"]
    },
    {
        id: "female_shag",
        name: "70s Shag",
        gender: "female",
        faceShapes: ["oval", "square", "oblong"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["retro", "trendy"]
    },
    {
        id: "female_lob",
        name: "Textured Lob",
        gender: "female",
        faceShapes: ["round", "oval", "heart"],
        texture: "wavy",
        length: "medium",
        image: femaleWaves,
        tags: ["modern", "versatile"]
    },
    {
        id: "female_fishtail",
        name: "Fishtail Braid",
        gender: "female",
        faceShapes: ["oval", "round"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["boho", "romantic"]
    },
    {
        id: "female_ponytail",
        name: "Sleek High Ponytail",
        gender: "female",
        faceShapes: ["oval", "round", "diamond"],
        texture: "straight",
        length: "long",
        image: femaleWaves,
        tags: ["sporty", "fierce"]
    },
    // Generating variations
    ...Array.from({ length: 25 }, (_, i) => ({
        id: `female_style_${i + 10}`,
        name: `Style Variation ${i + 1}`,
        gender: "female",
        faceShapes: i % 2 === 0 ? ["round", "oval"] : ["heart", "square"],
        texture: i % 3 === 0 ? "curly" : "straight",
        length: i % 4 === 0 ? "short" : "long",
        image: femaleWaves,
        tags: ["trending"]
    })),

    // --- MALE STYLES (15) ---
    {
        id: "male_undercut",
        name: "Modern Undercut",
        gender: "male",
        faceShapes: ["square", "oval", "diamond"],
        texture: "straight",
        length: "short",
        image: maleUndercut,
        tags: ["trendy", "sharp"]
    },
    {
        id: "male_pompadour",
        name: "Classic Pompadour",
        gender: "male",
        faceShapes: ["round", "oval", "square"],
        texture: "wavy",
        length: "medium",
        image: maleUndercut,
        tags: ["vintage", "bold"]
    },
    {
        id: "male_buzz_cut",
        name: "Buzz Cut",
        gender: "male",
        faceShapes: ["square", "oval"],
        texture: "straight",
        length: "short",
        image: maleUndercut,
        tags: ["clean", "low-maintenance"]
    },
    {
        id: "male_quiff",
        name: "Textured Quiff",
        gender: "male",
        faceShapes: ["oval", "round"],
        texture: "wavy",
        length: "short",
        image: maleUndercut,
        tags: ["casual", "popular"]
    },
    {
        id: "male_side_part",
        name: "Side Part",
        gender: "male",
        faceShapes: ["square", "diamond"],
        texture: "straight",
        length: "short",
        image: maleUndercut,
        tags: ["professional", "classic"]
    },
    // Generating variations
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `male_style_${i + 10}`,
        name: `Men's Edit ${i + 1}`,
        gender: "male",
        faceShapes: i % 2 === 0 ? ["square", "oval"] : ["round", "oblong"],
        texture: "straight",
        length: "short",
        image: maleUndercut,
        tags: ["modern"]
    }))
];

export const hairColors = [
    { name: "Jet Black", hex: "#090806" },
    { name: "Dark Brown", hex: "#3B3024" },
    { name: "Chestnut", hex: "#554236" },
    { name: "Auburn", hex: "#784334" },
    { name: "Copper", hex: "#A55639" },
    { name: "Golden Blonde", hex: "#D6B87C" },
    { name: "Platinum", hex: "#EBE9E4" },
    { name: "Pastel Pink", hex: "#E8A7B7", category: "fashion" },
    { name: "Lavender", hex: "#BFA8D6", category: "fashion" },
    { name: "Midnight Blue", hex: "#182657", category: "fashion" }
];
