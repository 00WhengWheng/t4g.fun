const {FlatCompat} = require('@eslint/eslintrc');
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('@react-native/eslint-config'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add custom rules here
    },
  },
];