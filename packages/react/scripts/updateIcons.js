const fs = require('fs-extra');
const { chdir } = require('process');
const { execSync } = require('child_process');

const dirPath = '../../material-design-icons';

fs.ensureDirSync(dirPath);
try {
  execSync('which svn');
  chdir(dirPath);
  execSync(
    'svn export --force https://github.com/google/material-design-icons/trunk/src svg',
    { encoding: 'utf8', stdio: 'inherit' }
  );
} catch (e) {
  console.log(
    `${e.message}. The script requires svn installed. Fallback to use degit instead.`
  );
  const destDirPath = `${dirPath}/svg`;
  fs.ensureDirSync(destDirPath);
  execSync(
    `degit --force git@github.com:google/material-design-icons/src ${destDirPath}`
  );
}
