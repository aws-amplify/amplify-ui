const config = require('../../.lintstagedrc.js');

module.exports = {
  ...config,
  '*.{ts,js,mjs}': 'eslint',
};
