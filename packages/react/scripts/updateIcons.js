const fs = require('fs-extra');
const { chdir } = require('process');
const { execSync } = require('child_process');

const dirPath = '../../material-design-icons';

fs.ensureDirSync(dirPath);
chdir(dirPath);
execSync(
  'svn export --force https://github.com/google/material-design-icons/trunk/src svg',
  { encoding: 'utf8', stdio: 'inherit' }
);
