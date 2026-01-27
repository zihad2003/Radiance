import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMakeupStore = create(
    persist(
        (set) => ({
            // --- Beauty Settings (Skin, Lighting) ---
            beautySettings: {
                smoothing: 40,
                brightness: 110,
                contrast: 105,
                saturation: 100,
                lighting: 'daylight',
                vignette: 20
            },
            setBeautySetting: (key, value) => set((state) => ({
                beautySettings: { ...state.beautySettings, [key]: value }
            })),
            setBeautySettings: (settings) => set({ beautySettings: settings }),

            // --- Makeup Configuration (Lips, Eyes, etc.) ---
            makeupState: {
                lips: { color: null, opacity: 0.7, finish: 'matte' },
                eyes: { color: null, opacity: 0.5 },
                blush: { color: null, opacity: 0.4 },
                face: { color: null, opacity: 0.0 },
            },
            setMakeupState: (newState) => set({ makeupState: newState }),

            // granular update
            updateMakeupCategory: (category, data) => set((state) => ({
                makeupState: { ...state.makeupState, [category]: data }
            })),

            resetMakeup: () => set({
                makeupState: {
                    lips: { color: null, opacity: 0.7, finish: 'matte' },
                    eyes: { color: null, opacity: 0.5 },
                    blush: { color: null, opacity: 0.4 },
                    face: { color: null, opacity: 0.0 },
                },
                activeProduct: null
            }),

            // --- Active Product Selection ---
            activeProduct: null,
            setActiveProduct: (product) => set({ activeProduct: product }),
        }),
        {
            name: 'radiance-makeup-storage', // Key for localStorage persistence
        }
    )
);
