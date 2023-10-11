import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': "radial-gradient(100% 450.27% at 0% 0%, rgba(219, 219, 219, 0.42) 0%, rgba(219, 219, 219, 0.06) 100%)",
        'a': "linear-gradient(135deg, rgba(121,195,82,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'b': "linear-gradient(135deg, rgba(16,52,124,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'c': "linear-gradient(135deg, rgba(108,163,217,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'd': "linear-gradient(135deg, rgba(204,210,12,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'e': "linear-gradient(135deg, rgba(250,167,29,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'f': "linear-gradient(135deg, rgba(232,114,112,0.9) 30%, rgba(255,255,255,0.2) 100%)",
        'default': "linear-gradient(135deg, rgba(97,96,106,0.9) 30%, rgba(255,255,255,0.2) 100%)",
      }
    },
  },
  plugins: [],
}
export default config
