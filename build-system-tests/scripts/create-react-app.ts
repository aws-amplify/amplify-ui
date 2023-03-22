import { exec } from 'child_process';
import { getArgs } from './utils/getArgs';

const args = getArgs();

exec(
  `cp ./environments/src/aws-exports.js ./cra-template-react-js/template/src/aws-exports.js`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }
);
exec(
  'npx create-react-app react-18-cra-5-js --use-npm --template file:cra-template-react-js',
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }
);
