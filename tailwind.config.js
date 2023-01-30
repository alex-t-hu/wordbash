/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./client/src/**/*.{html,js}"],
    content: ["./client/src/**/*.{html,js,ts}"],
    theme: {
        extend: {
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(+10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                'fade-in-down': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                'fade-in-left': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(+10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out',
                'fade-in-down': 'fade-in-down 0.5s ease-out',
                'fade-in-left': 'fade-in-left 2s ease-out',
            }
        },
    },
    plugins: [],
};