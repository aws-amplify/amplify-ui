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

> Only required for fresh installs.

### iOS Simulator

From the monorepo root run the following commands:

1. Install dependencies and build packages:

```bash
yarn && yarn build
```

1. Install CocoaPod dependencies:

```bash
yarn react-native-example ios:pod-install
```

1. Build and install the Example App:

```bash
yarn react-native-example ios
```

### Android Emulator

1. Install dependencies and build packages:

```bash
yarn && yarn build
```

1. Build and install the Example App:

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

1. To optionally develop against `@aws-amplify/ui`:

```bash
yarn ui dev
```

1. Run:

```bash
yarn react-native-example dev
```

1. Open the app on the iOS simulator or Android emulator.

## Running Integration Tests - TODO

## Linking an Internal Dependency

To include an Amplify UI package as a dependency add it to the `dependencies` field of the Example App's _package.json_ using the package name for the key and `*` as the version (informs Metro bundler to treat as an internal dependency):

```json
"dependencies": {
    "@aws-amplify/ui": "*",
    ...
},
```

> Only internal packages within the _packages_ directory are resolved in _metro.config.js_

## Troubleshooting

### Cleaning the Metro Cache

```bash
yarn react-native-example dev --reset-cache
```
