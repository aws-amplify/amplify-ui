#!/bin/bash

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="ts"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"
PKG_MANAGER="npm"
PKG_MANAGER_VERSION="latest"
PLATFORM="android"

# Options
# e.g.
# $ ./setup-mega-app.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm --pkg-manager-version latest
# $ ./setup-mega-app.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest -P npm -p latest
# $ ./setup-mega-app.sh -n react-latest-cra-latest-node-18-ts

while [[ $# -gt 0 ]]; do
  case $1 in
  -A | --platform)
    PLATFORM=$2
    shift
    ;;
  -B | --build-tool)
    BUILD_TOOL=$2
    shift
    ;;
  -b | --build-tool-version)
    BUILD_TOOL_VERSION=$2
    shift
    ;;
  -l | --language)
    LANGUAGE=$2
    shift
    ;;
  -n | --name)
    MEGA_APP_NAME=$2
    shift
    ;;
  -F | --framework)
    FRAMEWORK=$2
    shift
    ;;
  -f | --framework-version)
    FRAMEWORK_VERSION=$2
    shift
    ;;
  -P | --pkg-manager)
    PKG_MANAGER=$2
    shift
    ;;
  -p | --pkg-manager-version)
    PKG_MANAGER_VERSION=$2
    shift
    ;;
  -h | --help)
    echo "Usage: mega-app-create-app.sh [OPTIONS]"
    echo "Options:"
    echo "  -A, --platform              Specify the platform: android, ios (default: android)"
    echo "  -B, --build-tool            Specify the build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: cra)"
    echo "  -b, --build-tool-version    Specify the build tool version (default: latest)"
    echo "  -l, --language              Specify the language: js, ts (default: js)"
    echo "  -n, --name                  Specify the mega app name (required)"
    echo "  -F, --framework             Specify the framework: react, angular, vue, react-native (default: react)"
    echo "  -f, --framework-version     Specify the framework version (default: latest)"
    echo "  -P, --pkg-manager           Specify the package manager: npm, yarn (default: npm)"
    echo "  -p, --pkg-manager-version   Specify the package manager version (default: latest)"
    echo "  -h, --help                  Show help message"
    exit 0
    ;;
  *)
    echo "Unknown option: $1"
    exit 1
    ;;
  esac
  shift
done

# Check if MEGA_APP_NAME is provided
if [[ -z "$MEGA_APP_NAME" ]]; then
  MEGA_APP_NAME="$FRAMEWORK-$FRAMEWORK_VERSION-$BUILD_TOOL-$BUILD_TOOL_VERSION-$LANGUAGE"
fi

echo "##################"
echo "# Setup Mega App #"
echo "##################"

BASE_OPTIONS="--build-tool $BUILD_TOOL --build-tool-version $BUILD_TOOL_VERSION --language $LANGUAGE --name $MEGA_APP_NAME --framework $FRAMEWORK --framework-version $FRAMEWORK_VERSION"

# Create mega app
./scripts/mega-app-create-app.sh $BASE_OPTIONS

# Copy files
./scripts/mega-app-copy-files.sh $BASE_OPTIONS

# Install dependencies
./scripts/mega-app-install.sh $BASE_OPTIONS --pkg-manager $PKG_MANAGER --pkg-manager-version $PKG_MANAGER_VERSION

# Build mega app
./scripts/mega-app-build.sh $BASE_OPTIONS --platform $PLATFORM
