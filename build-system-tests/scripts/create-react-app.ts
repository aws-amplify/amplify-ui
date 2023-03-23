import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import { createFolder, getArgs, removeFolder } from './utils';

type Args = {
  react?: string;
  npm?: string | true;
  js?: string | true;
};
const args = getArgs() as Args;

if (args.js && !['true', 'false', true].includes(args.js)) {
  throw new Error('❌ js must be "true" or "false".');
}

if (args.npm && !['true', 'false', true].includes(args.npm)) {
  throw new Error('❌ npm must be "true" or "false".');
}

const templateSrcPath = path.join(
  __dirname,
  '../templates/cra-template-react/template/src'
);
const templateSrcName = 'template/src';
removeFolder(templateSrcPath, templateSrcName);
createFolder(templateSrcPath, templateSrcName);

const reactVersion = args.react ?? '18';
const buildTool = args.npm ? 'npm' : 'yarn';
const language = args.js ? 'js' : 'ts';
const fileType = language === 'ts' ? 'tsx' : 'js';
const appName = `react-${reactVersion}-cra-5-${language}`;
const appPath = `./mega-apps/${appName}`;

removeFolder(appPath, appName);
createFolder('./mega-apps/', 'mega-apps');
console.log(`👷‍ Creating app ${appName} with ${buildTool}...`);

const packageJson = {
  package: {
    dependencies: {
      '@aws-amplify/ui-react': 'latest',
      'aws-amplify': 'latest',
    },
  },
};

const filesToCopy = {
  'aws-export': {
    src: '../environments/src/aws-exports.js',
    dist: '../templates/cra-template-react/template/src/aws-exports.js',
  },
  app: {
    src: `../templates/components/react/App.js`,
    dist: `../templates/cra-template-react/template/src/App.${fileType}`,
  },
  index: {
    src: `../templates/components/react/cra/index-react-${reactVersion}.${
      reactVersion === '18' && fileType === 'tsx' ? 'tsx' : 'js'
    }`,
    dist: `../templates/cra-template-react/template/src/index.${fileType}`,
  },
};

if (reactVersion) {
  packageJson.package.dependencies['react'] = reactVersion;
  packageJson.package.dependencies['react-dom'] = reactVersion;
}

if (language === 'ts') {
  packageJson.package.dependencies['@types/node'] = '16'; // TODO: need to make it dynamic
  packageJson.package.dependencies['@types/react'] = reactVersion;
  packageJson.package.dependencies['@types/react-dom'] = reactVersion;
  packageJson.package.dependencies['typescript'] = 'latest';
  filesToCopy['tsconfig'] = {
    src: '../templates/components/template-tsconfig.json',
    dist: '../templates/cra-template-react/template/tsconfig.json',
  };
}

fs.writeFile(
  path.join(__dirname, '../templates/cra-template-react', `./template.json`),
  JSON.stringify(packageJson, null, 4),
  (err) => {
    if (err) throw err;
  }
);

Object.entries(filesToCopy).forEach(([fileName, val]) => {
  fs.copyFile(
    path.join(__dirname, val.src),
    path.join(__dirname, val.dist),
    (err) => {
      if (err) throw err;
      console.log(`Copied ${fileName} from ${val.src} to ${val.dist}`);
    }
  );
});

cp.exec(
  `npx create-react-app ./mega-apps/${appName}${
    args.npm ? ' --use-npm' : ''
  } --template file:./templates/cra-template-react`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }
);
