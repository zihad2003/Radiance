import { createJSONStorage } from 'zustand/middleware';

// Custom storage adapter to handle blocked localStorage
const storageAdapter = {
    getItem: (name) => {
        try {
            return localStorage.getItem(name);
        } catch (e) {
            console.warn('localStorage blocked, using memory');
            return window.tempStorage?.[name] || null;
        }
    },
    setItem: (name, value) => {
        try {
            localStorage.setItem(name, value);
        } catch (e) {
            window.tempStorage = window.tempStorage || {};
            window.tempStorage[name] = value;
        }
    },
    removeItem: (name) => {
        try {
            localStorage.removeItem(name);
        } catch (e) {
            if (window.tempStorage) delete window.tempStorage[name];
        }
    },
};

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
            storage: createJSONStorage(() => storageAdapter),
        }
    )
);
