import femaleWaves from '../assets/hairstyles/female_long_waves.png';
import maleUndercut from '../assets/hairstyles/male_undercut.png';

export const hairstyles = [
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
        image: femaleWaves, // Fallback for demo
        tags: ["professional", "chic"]
    },
    {
        id: "female_layered_curls",
        name: "Layered Curls",
        gender: "female",
        faceShapes: ["square", "diamond", "oval"],
        texture: "curly",
        length: "medium",
        image: femaleWaves, // Fallback for demo
        tags: ["glam", "volume"]
    },
    {
        id: "female_bangs_straight",
        name: "Straight with Bangs",
        gender: "female",
        faceShapes: ["oval", "oblong"],
        texture: "straight",
        length: "long",
        image: femaleWaves, // Fallback for demo
        tags: ["cute", "youthful"]
    },
    {
        id: "female_bridal_bun",
        name: "Bengali Bridal Bun",
        gender: "female",
        faceShapes: ["round", "oval", "heart", "square", "diamond", "oblong"],
        texture: "straight",
        length: "updo",
        image: femaleWaves, // Fallback for demo
        tags: ["wedding", "traditional", "elegant"]
    },
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
        image: maleUndercut, // Fallback for demo
        tags: ["vintage", "bold"]
    },
    {
        id: "male_buzz_cut",
        name: "Buzz Cut",
        gender: "male",
        faceShapes: ["square", "oval"],
        texture: "straight",
        length: "short",
        image: maleUndercut, // Fallback for demo
        tags: ["clean", "low-maintenance"]
    }
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
