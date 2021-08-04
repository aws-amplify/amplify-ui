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
    `${e.message}. The script requires svn installed. Fallback to use git instead.`
  );
  execSync('mkdir tmp');
  chdir('./tmp');
  execSync('git init -b master');
  execSync(
    'git remote add origin git@github.com:google/material-design-icons.git'
  );
  execSync('git config core.sparseCheckout true');
  execSync('echo "src/*" >> .git/info/sparse-checkout');
  execSync('git fetch origin master');
  execSync('git merge origin/master');
  const destDirPath = `../${dirPath}/svg`;
  fs.ensureDirSync(destDirPath);
  execSync(`cp -R src/* ${destDirPath}`);
  execSync('rm -rf ../tmp');
  console.log('Please install svn to reduce the script runtime.');
}
