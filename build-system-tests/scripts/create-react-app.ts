import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import { getArgs } from './utils/getArgs';

type Args = {
  react?: string;
  npm?: string | true;
  js?: string | true;
};
const args = getArgs() as Args;

if (args.js && !['true', 'false', true].includes(args.js)) {
  console.log(args.js);
  console.log('js must be "true" or "false".');
}

if (args.npm && !['true', 'false', true].includes(args.npm)) {
  console.log('npm must be "true" or "false".');
}

const reactVersion = args.react ?? '18';
const buildTool = args.npm ? 'npm' : 'yarn';
const language = args.js ? 'js' : 'ts';

console.log(
  `Reacting app react-${reactVersion}-cra-5-${language} with ${buildTool}...`
);

const packageJson = {
  package: {
    dependencies: {
      '@aws-amplify/ui-react': 'latest',
      'aws-amplify': 'latest',
    },
  },
};

if (reactVersion) {
  packageJson.package.dependencies['react'] = reactVersion;
  packageJson.package.dependencies['react-dom'] = reactVersion;
}

fs.writeFileSync(
  path.join(__dirname, '../templates/cra-template-react-js', `./template.json`),
  JSON.stringify(packageJson, null, 4)
);

fs.copyFile(
  './environments/src/aws-exports.js',
  './templates/cra-template-react-js/template/src/aws-exports.js',
  (err) => {
    if (err) throw err;
    console.log('Copied aws-exports.js to template');
  }
);

fs.copyFile(
  './templates/components/react/App.js',
  './templates/cra-template-react-js/template/src/App.js',
  (err) => {
    if (err) throw err;
    console.log('Copied App.js to template');
  }
);

fs.copyFile(
  `./templates/components/react/cra/index-react-${reactVersion}.js`,
  './templates/cra-template-react-js/template/src/index.js',
  (err) => {
    if (err) throw err;
    console.log('Copied index.js to template');
  }
);

cp.exec(
  `npx create-react-app ./mega-apps/react-${reactVersion}-cra-5-${language}${
    args.npm ? ' --use-npm' : ''
  } --template file:./templates/cra-template-react-${language}`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }
);
