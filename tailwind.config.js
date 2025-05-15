/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'discord-blue': '#5865F2',
        'discord-green': '#57F287',
        'discord-yellow': '#FEE75C',
        'discord-red': '#ED4245',
        'discord-purple': '#9B59B6',
        'discord-dark': '#36393F',
        'discord-darker': '#2F3136',
        'discord-darkest': '#202225',
        'discord-light': '#B9BBBE'
      }
    },
  },
  plugins: [],
};
 