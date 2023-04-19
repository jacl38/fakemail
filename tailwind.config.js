/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0px)', opacity: '1' }
				}
			},

			animation: {
				'fadeIn': 'fadeIn 0.5s'
			},
		},
	},
	plugins: [],
}

