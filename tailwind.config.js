/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                primary: {
                    50: '#FFF0F5',
                    100: '#FFE1EC',
                    200: '#FFC7DA',
                    300: '#FF9DBF',
                    400: '#FF69B4', // Hot Pink
                    500: '#FF1493', // Deep Pink
                    600: '#DB0073',
                    700: '#B7005E',
                    800: '#930052',
                    900: '#7A0047',
                },
                secondary: {
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    200: '#DDD6FE',
                    300: '#C4B5FD',
                    400: '#A78BFA',
                    500: '#9B59B6', // Purple
                    600: '#7C3AED',
                    700: '#6D28D9',
                    800: '#5B21B6',
                    900: '#4C1D95',
                },
                accent: {
                    gold: '#FFD700',
                    rose: '#B76E79',
                    champagne: '#F7E7CE',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
                cursive: ['Pacifico', 'cursive'],
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(255, 20, 147, 0.15)',
                'glow': '0 0 20px rgba(255, 105, 180, 0.5)',
                'inner-glow': 'inset 0 0 20px rgba(255, 105, 180, 0.3)',
            },
            animation: {
                'gradient': 'gradient 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
