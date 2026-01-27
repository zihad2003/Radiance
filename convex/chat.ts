"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const sendMessage = action({
    args: { message: v.string() },
    handler: async (ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return "I'm Aura, your AI assistant. To enable my full capabilities, please set the OPENAI_API_KEY in your Convex dashboard settings. For now, I can help you navigate to 'Book Appointment' or 'Virtual Try-On'!";
        }

        const openai = new OpenAI({ apiKey });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `You are Aura, a professional, warm, and sophisticated beauty consultant at Radiance Beauty Salon in Dhaka (Gulshan area).
            
            Your goal is to help customers:
            1. Choose makeup styles and hairstyles tailored to their features (face shape, skin tone).
            2. Book appointments (encourage them to click the 'Book Now' button).
            3. Explore the Virtual Try-On feature.
            4. Answer questions about services (Bridal, Party Makeover, Facials) and pricing.

            Key Information:
            - Location: Gulshan, Dhaka.
            - Hours: 10 AM - 9 PM daily.
            - Services: Bridal Makeover, Party Styling, HydraFacial, Hair Coloring, Manicure/Pedicure.
            - Features: AI Virtual Try-On, Hairstyle AI, Online Booking.
            - Tone: Elegant, helpful, empathetic, and knowledgeable. Use emojis occasionally (✨, 💄, 🌸).

            If asked about specific prices, give ranges (e.g., Bridal packages start from 15,000 BDT) and suggest checking the Services page for details.
            If asked for recommendations, ask follow-up questions about their skin type, occasion, or preferences.
            `
                    },
                    {
                        role: "user",
                        content: args.message
                    }
                ],
                temperature: 0.7,
                max_tokens: 300,
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API Error:", error);
            return "I apologize, but I'm having trouble connecting to my beauty knowledge base right now. Please try again in a moment, or browse our Services page directly! ✨";
        }
    },
});
