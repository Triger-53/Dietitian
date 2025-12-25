/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				"max-1100": { max: "1100px" },
			},
			colors: {
				primary: {
					50: "rgb(var(--color-primary-50) / <alpha-value>)",
					100: "rgb(var(--color-primary-100) / <alpha-value>)",
					200: "rgb(var(--color-primary-200) / <alpha-value>)",
					300: "rgb(var(--color-primary-300) / <alpha-value>)",
					400: "rgb(var(--color-primary-400) / <alpha-value>)",
					500: "rgb(var(--color-primary-500) / <alpha-value>)",
					600: "rgb(var(--color-primary-600) / <alpha-value>)",
					700: "rgb(var(--color-primary-700) / <alpha-value>)",
					800: "rgb(var(--color-primary-800) / <alpha-value>)",
					900: "rgb(var(--color-primary-900) / <alpha-value>)",
				},
				medical: {
					50: "rgb(var(--color-medical-50) / <alpha-value>)",
					100: "rgb(var(--color-medical-100) / <alpha-value>)",
					200: "rgb(var(--color-medical-200) / <alpha-value>)",
					300: "rgb(var(--color-medical-300) / <alpha-value>)",
					400: "rgb(var(--color-medical-400) / <alpha-value>)",
					500: "rgb(var(--color-medical-500) / <alpha-value>)",
					600: "rgb(var(--color-medical-600) / <alpha-value>)",
					700: "rgb(var(--color-medical-700) / <alpha-value>)",
					800: "rgb(var(--color-medical-800) / <alpha-value>)",
					900: "rgb(var(--color-medical-900) / <alpha-value>)",
				},
				accent: {
					50: "rgb(var(--color-accent-50) / <alpha-value>)",
					100: "rgb(var(--color-accent-100) / <alpha-value>)",
					200: "rgb(var(--color-accent-200) / <alpha-value>)",
					300: "rgb(var(--color-accent-300) / <alpha-value>)",
					400: "rgb(var(--color-accent-400) / <alpha-value>)",
					500: "rgb(var(--color-accent-500) / <alpha-value>)",
					600: "rgb(var(--color-accent-600) / <alpha-value>)",
					700: "rgb(var(--color-accent-700) / <alpha-value>)",
					800: "rgb(var(--color-accent-800) / <alpha-value>)",
					900: "rgb(var(--color-accent-900) / <alpha-value>)",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
}
