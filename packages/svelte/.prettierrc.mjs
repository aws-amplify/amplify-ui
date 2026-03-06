/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
import baseConfig from '../../.prettierrc.mjs';
const config = {
  ...baseConfig,
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
};

export default config;
