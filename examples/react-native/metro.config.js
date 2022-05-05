const path = require('path');
const { readdirSync } = require('fs');

// for Amplify UI package depedencies used by the example app,
// always set "version" value to `"*"`
const INTERNAL_DEPENDENCY_FLAG = '*';

// only 'packages' for now, but can be extended for use with other directories
const INTERNAL_DIRECTORY_ROOTS = ['packages'];

const EXAMPLE_APP_PACKAGE_JSON = require('./package.json');
const EXAMPLE_APP_ROOT = __dirname;

const WORKSPACE_ROOT_PATH = path.resolve(__dirname, '../..');
const WORKSPACE_NODE_MODULES_PATH = path.resolve(
  __dirname,
  '../../node_modules'
);

const config = { resolver: {}, transformer: {} };

const dependencies = {
  ...EXAMPLE_APP_PACKAGE_JSON.dependencies,
  ...EXAMPLE_APP_PACKAGE_JSON.devDependencies,
};

function getInternalPackages(root, internalPackagesDirectory) {
  return internalPackagesDirectory
    .map((packageDirectory) => {
      const internalDirectoryRoot = path.resolve(root, packageDirectory);

      return readdirSync(internalDirectoryRoot, {
        withFileTypes: true,
      }).map(({ name }) => {
        const packagePath = path.resolve(internalDirectoryRoot, name);
        const packageName = require(`${packagePath}/package.json`).name;

        return { packageName, packagePath };
      });
    })
    .flat();
}

// use "*"" as version to denote internally used package
const internalUsedDeps = Object.keys(dependencies).filter(
  (dep) => dependencies[dep] === INTERNAL_DEPENDENCY_FLAG
);

const isInternalUsedDep = ({ packageName }) =>
  internalUsedDeps.some((dep) => packageName === dep);

const internalPackages = getInternalPackages(
  path.resolve(WORKSPACE_ROOT_PATH),
  INTERNAL_DIRECTORY_ROOTS
);

// prevent watching the entire repo, only watch:
// - root node_modules
// - used internal deps
const watchFolders = internalPackages
  .filter(isInternalUsedDep)
  .map(({ packagePath }) => packagePath);

config.watchFolders = [WORKSPACE_NODE_MODULES_PATH, ...watchFolders];

// include app and package node_modules
config.resolver.nodeModulesPath = [
  path.resolve(EXAMPLE_APP_ROOT, 'node_modules'),
  path.resolve(WORKSPACE_ROOT_PATH, 'node_modules'),
];

const isNotRootPackage = ({ packageName }) =>
  packageName !== EXAMPLE_APP_PACKAGE_JSON.name;

const unusedInternalPackagePaths = internalPackages
  .filter(isNotRootPackage)
  .filter((dep) => !isInternalUsedDep(dep))
  .map(
    ({ packagePath }) =>
      new RegExp(`^${escape(path.resolve(packagePath))}\\/.*$`)
  );

const usedInternalPackagePaths = internalPackages
  .filter(isNotRootPackage)
  .filter(isInternalUsedDep)
  .map(
    ({ packagePath }) =>
      new RegExp(`^${escape(path.resolve(packagePath, 'node_modules'))}\\/.*$`)
  );

config.resolver.blockList = [
  ...unusedInternalPackagePaths,
  ...usedInternalPackagePaths,
];

// point to the example app react-native dep
config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
};

// base transform values included by `react-native init`
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
