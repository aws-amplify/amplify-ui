const shell = require('shelljs');
const fs = require('fs-extra');

const dirPath = '../../material-design-icons';

fs.ensureDirSync(dirPath);
shell.cd(dirPath);
shell.exec(
  'svn export --force https://github.com/google/material-design-icons/trunk/src svg'
);
