const config = require('../../.lintstagedrc.js');

module.exports = {
  ...config,
  '*.ts': 'eslint',
  '**/*.ts': 'tsc-files --noEmit',
};
