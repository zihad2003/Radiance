export const BEAUTY_STORIES = [
    // --- BRIDAL TRANSFORMATIONS (10 stories) ---
    {
        id: "story_1",
        category: "Bridal",
        name: "Nusrat Rahman",
        age: 26,
        profession: "Banker",
        location: "Gulshan, Dhaka",
        occasion: "Wedding Ceremony",
        package: "Radiance Premium Bride",
        price: "৳45,000",
        date: "December 2025",
        rating: 5,
        quote: "I felt like a dream version of myself. The makeup lasted through tears, humidity, and 12 hours of celebrating!",
        challenge: "Acne-prone skin, worried about makeup lasting.",
        story: "Booked 2 months in advance. Had acne-prone skin, worried about makeup lasting. Makeup trial helped choose perfect products. Wedding day: 5-hour transformation. Result: Flawless, glowing bride.",
        stylistNote: "We used a special matte primer and airbrush foundation to ensure full coverage without looking heavy, specifically targeting her concerns about Dhaka's humidity.",
        images: {
            hero: "/assets/stories/nusrat_after_1.png",
            before: "/assets/stories/nusrat_before.png",
            during: ["/assets/stories/nusrat_process_1.png", "/assets/stories/nusrat_process_2.png"],
            after: ["/assets/stories/nusrat_after_1.png", "/assets/stories/nusrat_after_2.png", "/assets/stories/nusrat_after_3.png"],
            reception: "/assets/stories/nusrat_reception.png",
            detailed: {
                eyes: "/assets/stories/nusrat_eyes.png",
                lips: "/assets/stories/nusrat_lips.png",
                hair: "/assets/stories/nusrat_hair.png"
            }
        },
        video: {
            testimonial: "/assets/stories/nusrat_testimonial.mp4",
            timelapse: "/assets/stories/nusrat_timelapse.mp4"
        }
    },
    {
        id: "story_2",
        category: "Bridal",
        name: "Tasnia Ahmed",
        age: 24,
        profession: "Teacher",
        location: "Uttara, Dhaka",
        occasion: "Intimate Nikkah",
        package: "Radiance Basic Bride",
        price: "৳18,000",
        date: "November 2025",
        rating: 5,
        quote: "I wanted to look like myself, just elevated. Radiance understood my vision perfectly.",
        challenge: "Wanted minimal but elegant makeup.",
        story: "Tasnia wanted a soft pink and white theme to match her Nikkah attire. We focused on a natural, dewy finish and elegant hijab styling.",
        images: {
            hero: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
            before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
            after: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800"]
        }
    },
    {
        id: "story_3",
        category: "Bridal",
        name: "Lamia Chowdhury",
        age: 28,
        profession: "Entrepreneur",
        location: "Dhanmondi, Dhaka",
        occasion: "Grand Reception",
        package: "Radiance Platinum Bride",
        price: "৳65,000",
        date: "January 2026",
        rating: 5,
        quote: "The makeup lasted entire night! Touch-ups provided at the venue were a lifesaver.",
        challenge: "Bollywood-inspired glam for 500+ guests.",
        story: "Wanted Bollywood-inspired glam. On-location service at Radisson hotel. Dramatic evening makeup with multiple outfit changes.",
        images: {
            hero: "https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800",
            before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
            after: ["https://images.unsplash.com/photo-1594462255122-217f0dbdf24b?q=80&w=800"]
        }
    },
    {
        id: "story_4",
        category: "Bridal",
        name: "Samira Khan",
        age: 27,
        occasion: "Destination Wedding",
        location: "Cox's Bazar",
        package: "Radiance Platinum Bride",
        quote: "Beautiful beach-proof makeup.",
        story: "Beach wedding in Cox's Bazar. Focus on waterproof and sweat-proof products."
    },
    {
        id: "story_5",
        category: "Bridal",
        name: "Rifat Ara",
        age: 25,
        occasion: "Traditional Chittagonian Wedding",
        location: "Chittagong",
        package: "Radiance Signature Bride",
        quote: "Honored my roots with this look.",
        story: "Heavy traditional gold jewelry and vibrant red saree required a balanced yet royal makeup look."
    },
    {
        id: "story_6",
        category: "Bridal",
        name: "Nabila Tabassum",
        age: 29,
        occasion: "Confidence Story",
        package: "Radiance Premium Bride",
        quote: "Felt like a queen in my own skin.",
        story: "Plus-size bride confidence story. Emphasizing feature-enhancing contouring."
    },
    {
        id: "story_7",
        category: "Bridal",
        name: "Mrs. Haque",
        age: 42,
        occasion: "Second Marriage",
        package: "Radiance Basic Bride",
        quote: "Elegant and age-appropriate.",
        story: "Mature bride (35+) elegant look. Focus on hydration and subtle lifting techniques."
    },
    {
        id: "story_8",
        category: "Bridal",
        name: "Maya & Rahul",
        age: 26,
        occasion: "Interfaith Wedding",
        package: "Radiance Premium Bride",
        quote: "Culturally fusioned beauty.",
        story: "Interfaith wedding fusion makeup, blending traditional Bengali and modern elements."
    },
    {
        id: "story_9",
        category: "Bridal",
        name: "Esha Aziz",
        age: 23,
        occasion: "Modern Minimalist",
        package: "Radiance Basic Bride",
        quote: "Exactly what I wanted—nothing more, nothing less.",
        story: "Minimalist modern bride. No heavy lashes, focusing on a clean girl aesthetic with a Desi twist."
    },
    {
        id: "story_10",
        category: "Bridal",
        name: "Zara & Zoya",
        age: 24,
        occasion: "Double Wedding (Twins)",
        package: "Bridesmaids Squad (Customized)",
        quote: "Twice the beauty, twice the fun!",
        story: "Twins' double wedding. Coordinated looks that still highlighted their individual personalities."
    },

    // --- PARTY & EVENT STORIES (5 stories) ---
    {
        id: "story_11",
        category: "Party",
        name: "Sadia Islam",
        age: 21,
        profession: "Student",
        occasion: "21st Birthday Bash",
        package: "Birthday Queen",
        price: "৳8,000",
        quote: "Instagram-worthy glam! The neon lights at the party made my highlight pop.",
        story: "Wanted: Instagram-worthy glam. Visuals: Club/party atmosphere, neon lights, bold makeup."
    },
    {
        id: "story_12",
        category: "Party",
        name: "Farhana Khan",
        age: 32,
        profession: "Executive",
        occasion: "Corporate Awards Night",
        package: "Red Carpet Ready",
        quote: "I felt so confident on stage. The professional polish was exactly what I needed.",
        story: "Nervous about being center stage. After: Confident and camera-ready. Polished executive look."
    },
    {
        id: "story_13",
        category: "Party",
        name: "Anika",
        age: 22,
        occasion: "Graduation Day",
        package: "Graduation Glam",
        quote: "Perfect for my convocation photos.",
        story: "Graduation day glow-up. Simple, fresh, and camera-ready for professional academic portraits."
    },
    {
        id: "story_14",
        category: "Party",
        name: "Mariya",
        age: 25,
        occasion: "Date Night",
        package: "Glam Night Out",
        quote: "He couldn't take his eyes off me.",
        story: "Date night transformation. Sultry eyes and soft-focus skin."
    },
    {
        id: "story_15",
        category: "Party",
        name: "Tahmina",
        age: 24,
        occasion: "Eid Festival",
        package: "Eid Glam Package",
        quote: "The festive sparkle stayed all day.",
        story: "Festival (Eid) makeup story. Long-lasting products for a full day of visiting relatives."
    },

    // --- TRANSFORMATION JOURNEYS (3 stories) ---
    {
        id: "story_16",
        category: "Transformation",
        name: "Rina Das",
        age: 29,
        occasion: "Skin Journey",
        package: "Skin Revival Series",
        price: "৳12,000",
        quote: "I never thought I'd feel confident without makeup. Now I do!",
        challenge: "Acne scars, pigmentation.",
        story: "3-month Skin Revival Series. Month 0-3 progression from healing to final glowing skin.",
        video: { timelapse: "/assets/stories/rina_skin_journey.mp4" }
    },
    {
        id: "story_17",
        category: "Transformation",
        name: "Maliha",
        age: 26,
        occasion: "Hair Recovery",
        package: "Hair Rescue Package",
        price: "৳15,000",
        quote: "My hair finally feels alive again.",
        challenge: "Damaged hair from repeated bleaching.",
        story: "Results: Restored shine and health. Before/after hair quality comparison after 5 intensive sessions."
    },
    {
        id: "story_18",
        category: "Transformation",
        name: "Sharmila",
        age: 31,
        occasion: "Confidence Story",
        package: "Bestie Makeover Day",
        quote: "This was more than just makeup; it was empowerment.",
        story: "Self-esteem issues. First professional makeup experience. Emotional transformation."
    },

    // --- SPECIAL OCCASION (2 stories) ---
    {
        id: "story_19",
        category: "Special",
        name: "Boishakh Friends",
        age: 24,
        occasion: "Pohela Boishakh",
        package: "Seasonal Specials",
        quote: "The most authenticated Bengali New Year look.",
        story: "Group of friends celebrating Bengali New Year. Traditional makeup and saree draping. Red and white theme."
    },
    {
        id: "story_20",
        category: "Special",
        name: "Mrs. Ahmed & Daughter",
        age: "55 & 30",
        occasion: "Mother-Daughter Bonding",
        package: "Mother-Daughter Day",
        quote: "A day we'll cherish forever.",
        story: "Special day for mother and daughter. Generational beauty story about sharing a day of pampering."
    }
];

export const STORY_CATEGORIES = ["All", "Bridal", "Party", "Transformation", "Special"];
export const SKIN_TONES = ["All", "Fair", "Medium", "Deep"];
export const BUDGET_RANGES = ["All", "Under ৳10k", "৳10-30k", "৳30-50k", "৳50k+"];
