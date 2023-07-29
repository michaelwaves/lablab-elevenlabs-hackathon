/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        "galaxy": "url('/taylor_swift.png')",
      },
      colors: {
        p: {
          1: '#174313',
          2: "#236a1d",
          3: "#2f8a2a",
          4: "#3fa93a",
          5: "#51c151",
          6: "#6edc6e",
          7: "#d6ffd2",
        },
        s: {
          1: "#3b0e39",
          2: "#5c1a5b",
          3: "#7c2a7c",
          4: "#9d3d9d",
          5: "#bf51bf",
          6: "#d46ed4",
          7: "#f2d6f2",
        },
        a1: {
          1: "#07283f",
          2: "#0e4d7a",
          3: "#1368a8",
          4: "#1a83d6",
          5: "#1fa3ff",
          6: "#4fb3ff",
          7: "#b3d6ff",
        },
        a2: {
          1: "#490202",
          2: "#7a0a0a",
          3: "#a81e1e",
          4: "#d62f2f",
          5: "#ff3f3f",
          6: "#ff6e6e",
          7: "#ffd6d6",
        },
      },
    },
    fontFamily: {
      heading: ["var(--font-audiowide)"],
      body: ["var(--font-ubuntu)"],
    },
    plugins: [],
  }
}

