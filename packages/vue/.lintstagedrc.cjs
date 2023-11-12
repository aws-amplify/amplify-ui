const config = require('../../.lintstagedrc.js');

module.exports = {
  ...config,
  '*.{ts,tsx,js,vue}': 'eslint',
};
