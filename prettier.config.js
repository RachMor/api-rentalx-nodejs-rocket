module.exports = {
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'flow',
      },
    },
  ],
}
