module.exports = {
  '*.{ts,js,cjs,mjs,svelte,css,md}':
    'prettier --write --plugin prettier-plugin-svelte',
  '*.{ts,js,cjs,mjs,svelte}': 'eslint .',
};
