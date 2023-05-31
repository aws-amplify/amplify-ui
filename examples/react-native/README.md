# Getting Started

## Setup React Native Environment

First, navigate to the [React Native docs](https://reactnative.dev/docs/environment-setup) to add the required dependencies for running React Native.

> Only the Installing Dependencies section of the documentation is required for getting started with the Example App.

Follow the docs for adding the required dependencies making sure the **React Native CLI Quickstart** tab is selected. Click on **macOS** as the Development Environment, and select either **Android** or **iOS** as the target OS with the following caveat:

**If using an M1 Macbook** and getting started with iOS, in the [install `CocoaPods` step](https://reactnative.dev/docs/environment-setup#cocoapods), rather than installing `ffi`, install `CocoaPods` via `brew`:

```bash
arch -arm64 brew install cocoapods
```

> the Example App assumes usage with **macOS** and has not been tested for **Windows** or **Linux** development.

## Build and install the Example App

_prerequisite_: You must populate `.env` values in order for example app to run successfully. The values you need to populate are specified in [`examples/react-native/.env.example`](./.env.example).

> Only required for fresh installs.

### iOS Simulator

From the monorepo root run the following commands:

1. Install dependencies and build packages:

```bash
yarn && yarn build
```

2. Install CocoaPod dependencies:

```bash
yarn react-native-example ios:pod-install
```

3. Build and install the Example App:

```bash
yarn react-native-example ios
```

### Android Emulator

1. Install dependencies and build packages:

```bash
yarn && yarn build
```

2. Build and install the Example App:

```bash
yarn react-native-example android
```

## Developing Locally

When developing locally, always run any dependency `dev` commands for the dependency packages **before** starting the React Native dev server.

This prevents the Metro bundler from encountering a module resolution error while watching the _dist_ direectory of the dependency during its recreation at the onset of a `dev` command, when the _dist_ directory is initially rebuilt.

All of the below commands should be run from the monorepo root.

1. To optionally develop against `@aws-amplify/ui-react-native`:

```bash
yarn react-native dev
```

2. To optionally develop against `@aws-amplify/ui`:

```bash
yarn ui build
```

3. Run:

```bash
yarn react-native-example dev
```

4. Open the app on the iOS simulator or Android emulator.

## Storybook

### With Storybook Server

Will serve a web interface that allows switching between components (stories) and controlling multiple simulators/emulators.

First boot Storybook Server:

```bash
# terminal 1
yarn run react-native-example storybook
```

From a second terminal run iOS simulator, Android emulator or both (requires app to be installed):

```bash
# terminal 2
yarn run react-native-example dev
```

Refresh the Storybook web interface to load all the stories.

### On iOS simulator/Android emulator only

```bash
yarn run react-native-example dev
```

In the Storybook app switch between `Navigator` and `Preview` tabs to select components/stories.

## Running Integration Tests - TODO

## Linking an Internal Dependency

To include an Amplify UI package as a dependency add it to the `dependencies` field of the Example App's _package.json_ using the package name for the key and `*` as the version (informs Metro bundler to treat as an internal dependency):

```json
"dependencies": {
    "@aws-amplify/ui": "*",
    ...
},
```

Then update the value of `INTERNAL_DEPENDENCY_DIRECTORY_NAMES` in the Example app [_metro.config.js_](./metro.config.js) to include the internal dependency package **directory** name:

```js
const INTERNAL_DEPENDENCY_DIRECTORY_NAMES = [
  'ui'
  ...
]
```

> Only internal packages within the _packages_ directory are resolved in _metro.config.js_

## Adding Dependencies with Native Modules or direct React usage required by `@aws-amplify/ui-react-native`

Metro needs to be informed of the location of dependencies with native modules and dependencies that use React directly. Any new dependency added to `@aws-amplify/ui-react-native` with native modules or a dependency on React will need to be added to the `config.resolver.extraNodeModules` field of the _metro.config.js_ with the path to resolve, example:

```
config.resolver.extraNodeModules = {
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
}
```

## Using env variables

Add a local _.env_ file, then copy/paste the contents of _.env.sample_ inside, updating the values as needed:

```sh
# .env
GREETING='Hello World!'
```

### Adding `env` variables

Add your variable name to _.env_ (and _.env.sample_ if committing) and to _./types/env.d.ts_ to appease typescript:

```sh
# .env
GREETING='Hello World!'
MY_ENV_VARIABLE=FOO
```

```ts
// ./types/env.d.ts
declare module '@env' {
  export const GREETING: string;
  export const MY_ENV_VARIABLE: string;
}
```

To use your newly added env variable:

```ts
// *.tsx
import { MY_ENV_VARIABLE } from '@env';
```

If the example app is not picking up changes to the values in _.env_ close Metro and reset the cache (see troubleshooting section).

## Troubleshooting

### Cleaning the Metro Cache

```bash
yarn react-native-example dev --reset-cache
```

### Android emulator fails to connect to Metro server

```bash
adb reverse tcp:8081 tcp:8081
```
