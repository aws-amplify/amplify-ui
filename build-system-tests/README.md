## Build System Tests

Build System Tests is to create Apps using different Frameworks, Built Tools with Amplify UI and run build test against them.

### Github Action

There are two Github workflows:

- Build System Test
- Build System Test React Native (runs less frequently because the tests take longer)

### Local

In this _build-system-tests_ folder, run

```sh
$ npm run <MEGA_APP_NAME> # e.g. npm run react-latest-vite-latest-ts
$ npm run setup:<FRAMEWORK>:<BUILD_TOOL> -- --framework-version <FRAMEWORK_VERSION_NUMBER> --build-tool-version <BUILD_TOOL_VERSION_NUMBER> # e.g npm run setup:vue:vite -- -f latest -b 2
```

Note:
We test different environments by changing the NodeJS versions and npm/yarn versions on Github Workflows, which need to be changed manually when testing on local.

To change the node versions

```sh
nvm install <VERSION-NUMBER> # if hasn't installed
nvm use <VERSION-NUMBER>
```

### Create A New MegaApp not exist in package.json

If the MegaApp you want to create is not pre-configured in the package.json, here are several ways to create it using the scripts/ .

#### Setup MegaApp in One Step

```sh
$ ./mega-app-create-app.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest

$ npm run setup:<FRAMEWORK>:<BUILD_TOOL> -- --framework-version <FRAMEWORK_VERSION_NUMBER> --build-tool-version <BUILD_TOOL_VERSION_NUMBER> # e.g npm run setup:vue:vite -- -f latest -b 2
```

### Setup MegaApp Step by Step

- Step 1: Create

```sh
$ ./mega-app-create-app.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest
```

- Step 2: Copy/Modify Files

```sh
$ ./mega-app-copy-files.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest
$ ./mega-app-copy-files.sh -n react-latest-cra-latest-node-18-ts
$ ./mega-app-copy-files.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest
```

- Step 3: Install Dependencies

```sh
$ ./mega-app-install.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm --pkg-manager-version latest
$ ./mega-app-install.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest -P npm -p latest
$ ./mega-app-install.sh -n react-latest-cra-latest-node-18-ts
```

- Step 4: Run Build

```sh
$ ./mega-app-build.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm
$ ./mega-app-build.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest -P npm
$ ./mega-app-build.sh -n react-latest-cra-latest-node-18-ts
```

### Troubleshooting

- If see the following error message:

> “Your global Angular CLI version (14.2.11) is greater than your local version (12.2.18). The local Angular CLI version is used.”

It might be a @angular/cli@12.2.18 installed in root-folder _node_modules_. Deleting it would resolve the error.
