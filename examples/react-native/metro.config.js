const path = require('path');
const { readdirSync } = require('fs');

// for Amplify UI package depedencies used by the example app,
// always set "version" value to `"*"`
const INTERNAL_DEPENDENCY_FLAG = '*';

// only 'packages' for now, but can be extended for use with other directories
const INTERNAL_DIRECTORY_ROOTS = ['packages'];

// internal packages used by the RN example
const INTERNAL_USED_PACKAGES = ['ui', 'react-core', 'react-native'];

const EXAMPLE_APP_PACKAGE_JSON = require('./package.json');
const EXAMPLE_APP_ROOT = __dirname;

const WORKSPACE_ROOT_PATH = path.resolve(__dirname, '../..');
const WORKSPACE_NODE_MODULES_PATH = path.resolve(
  __dirname,
  '../../node_modules'
);
const ENVIRONMENTS_MODULE_PATH = path.resolve(
  WORKSPACE_ROOT_PATH,
  'environments'
);

const config = { resolver: {}, transformer: {}, server: {} };

const dependencies = {
  ...EXAMPLE_APP_PACKAGE_JSON.dependencies,
  ...EXAMPLE_APP_PACKAGE_JSON.devDependencies,
};

const filterUnusedInternalPackages = ({ name }) =>
  INTERNAL_USED_PACKAGES.includes(name);

function getInternalPackages(root, internalPackagesDirectory) {
  return internalPackagesDirectory
    .map((packageDirectory) => {
      const internalDirectoryRoot = path.resolve(root, packageDirectory);

      return readdirSync(internalDirectoryRoot, {
        withFileTypes: true,
      })
        .filter(filterUnusedInternalPackages)
        .map(({ name }) => {
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

config.watchFolders = [
  ENVIRONMENTS_MODULE_PATH,
  WORKSPACE_NODE_MODULES_PATH,
  ...watchFolders,
];

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

// point to the example app deps for React related and deps requiring native modules
config.resolver.extraNodeModules = {
  // core React and React Native dependencies
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),

  // xstate uses React under the hood
  '@xstate/react': path.resolve(__dirname, 'node_modules/@xstate/react'),

  // depedendencies with native modules
  '@react-native-picker/picker': path.resolve(
    __dirname,
    'node_modules/@react-native-picker/picker'
  ),
  'react-native-safe-area-context': path.resolve(
    __dirname,
    'node_modules/react-native-safe-area-context'
  ),
};

// base transform values included by `react-native init`
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

/**
 * Below workaround is needed because assets resolutions don't work for Android in monorepo
 * Ref:
 * https://github.com/react-native-community/cli/issues/1238
 * https://github.com/facebook/metro/issues/290#issuecomment-543746458
 */
config.transformer.publicPath = '/assets/dir1/dir2/dir3';
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    if (req.url.startsWith('/assets/dir1/dir2/dir3')) {
      req.url = req.url.replace('/assets/dir1/dir2/dir3', '/assets');
    } else if (req.url.startsWith('/assets/dir1/dir2')) {
      req.url = req.url.replace('/assets/dir1/dir2', '/assets/..');
    } else if (req.url.startsWith('/assets/dir1')) {
      req.url = req.url.replace('/assets/dir1', '/assets/../..');
    } else if (req.url.startsWith('/assets')) {
      req.url = req.url.replace('/assets', '/assets/../../..');
    }
    return middleware(req, res, next);
  };
};

module.exports = config;
