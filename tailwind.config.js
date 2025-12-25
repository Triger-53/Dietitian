/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				"max-1100": { max: "1100px" }, // new custom breakpoint
			},
		},
	},

	theme: {
		extend: {
			colors: {
				primary: {
					50: "#ECFDF5",
					100: "#D1FAE5",
					200: "#A7F3D0",
					300: "#6EE7B7",
					400: "#34D399",
					500: "#10B981",
					600: "#059669",
					700: "#047857",
					800: "#065F46",
					900: "#064E3B",
				},
				medical: {
					50: "#F0FDF4",
					100: "#DCFCE7",
					200: "#BBF7D0",
					300: "#86EFAC",
					400: "#4ADE80",
					500: "#22C55E",
					600: "#16A34A",
					700: "#15803D",
					800: "#166534",
					900: "#14532D",
				},
				accent: {
					50: "#FEFCE8",
					100: "#FEF9C3",
					200: "#FEF08A",
					300: "#FDE047",
					400: "#FACC15",
					500: "#EAB308",
					600: "#CA8A04",
					700: "#A16207",
					800: "#854D0E",
					900: "#713F12",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
}
