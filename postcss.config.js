module.exports = {
  plugins: {
    autoprefixer: {},
    '@unocss/postcss': {
      // Optional
      content: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}']
    }
  }
}
