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
  throw new Error('js must be "true" or "false".');
}

if (args.npm && !['true', 'false', true].includes(args.npm)) {
  throw new Error('npm must be "true" or "false".');
}

const reactVersion = args.react ?? '18';
const buildTool = args.npm ? 'npm' : 'yarn';
const language = args.js ? 'js' : 'ts';
const fileType = language === 'js' ? 'js' : 'tsx';

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

const filesToCopy = {
  'aws-export': {
    src: '../environments/src/aws-exports.js',
    dist: '../templates/cra-template-react-js/template/src/aws-exports.js',
  },
  app: {
    src: `../templates/components/react/App.js`,
    dist: `../templates/cra-template-react-js/template/src/App.${fileType}`,
  },
  index: {
    src: `../templates/components/react/cra/index-react-${reactVersion}.${fileType}`,
    dist: `../templates/cra-template-react-js/template/src/index.${fileType}`,
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
    dist: '../templates/cra-template-react-js/template/tsconfig.json',
  };
}

fs.writeFileSync(
  path.join(__dirname, '../templates/cra-template-react-js', `./template.json`),
  JSON.stringify(packageJson, null, 4)
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
  `npx create-react-app ./mega-apps/react-${reactVersion}-cra-5-${language}${
    args.npm ? ' --use-npm' : ''
  } --template file:./templates/cra-template-react-js`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }
);
