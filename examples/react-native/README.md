# Getting Started

## Setup React Native Environment

Follow the React Native docs for [adding the required dependencies](https://reactnative.dev/docs/environment-setup#installing-dependencies) with **macOS** as the Development Environment, select either **Android** or **iOS** as the target OS.

> the Example App assumes usage with **macOS** and has not been tested for **Windows** or **Linux** development

## Build and install the Example App

> Only required for fresh installs

### iOS Simulator

From the monorepo root run the following commands:

1. Install dependencies and build packages

```bash
yarn && yarn build
```

1. Install CocoaPod dependencies

```bash
yarn react-native-example ios:pod-install
```

1. Build and install the Example App

```bash
yarn react-native-example ios
```

### Android Emulator

1. Install dependencies and build packages

```bash
yarn && yarn build
```

1. Build and install the Example App

```bash
yarn react-native-example android
```

## Running the Example App

After the Example App has been installed on a simulator or emulator:

1. From the monorepo root run:

```bash
yarn react-native-example dev
```

2. Open the Example App on the iOS simulator or Android emulator

## Developing Locally

To develop against `@aws-amplify/ui-react-native`, from the monorepo root run:

```bash
yarn react-native dev
```

To develop against `@aws-amplify/ui`, from the monorepo root run:

```bash
yarn ui dev
```

## Running Integration Tests - TODO

## Troubleshooting

### Cleaning the Cache

```bash
yarn react-native-example dev --reset-cache
```
