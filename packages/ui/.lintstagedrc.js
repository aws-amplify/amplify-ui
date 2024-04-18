const config = require('../../.lintstagedrc.js');

module.exports = {
  ...config,
  '*.{ts,js}': 'eslint',
  '**/*.ts': 'tsc-files --noEmit',
};
