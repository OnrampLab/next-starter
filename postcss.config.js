module.exports = {
  plugins: [
    require('tailwindcss'),
    process.env.NODE_ENV === "production"
      ? [
        require("@fullhuman/postcss-purgecss"),
          {
            content: [
              "./pages/**/*.{js,jsx,ts,tsx}",
              "./components/**/*.{js,jsx,ts,tsx}"
            ],
            defaultExtractor: content => content.match(/[w-/:]+(?<!:)/g) || []
          }
        ]
      : undefined,
      require("autoprefixer")
  ]
};
