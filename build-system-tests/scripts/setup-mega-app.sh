#!/bin/bash
set -e

# Default values
BUILD_TOOL="next"
BUILD_TOOL_VERSION="latest"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"
PKG_MANAGER="npm"
PLATFORM="android"
TAG="latest"

# Options
# e.g.
# $ ./setup-mega-app.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest --pkg-manager npm
# $ ./setup-mega-app.sh -B next -b latest -l typescript -n react-latest-next-latest-node-18-ts -F react -f latest -P npm -p latest
# $ ./setup-mega-app.sh -n react-latest-next-latest-node-18-ts

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
  -t | --tag)
    TAG=$2
    shift
    ;;
  -h | --help)
    echo "Usage: mega-app-create-app.sh [OPTIONS]"
    echo "Options:"
    echo "  -A, --platform              Specify the platform: android, ios (default: android)"
    echo "  -B, --build-tool            Specify the build tool: next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: next)"
    echo "  -b, --build-tool-version    Specify the build tool version (default: latest)"
    echo "  -n, --name                  Specify the mega app name (required)"
    echo "  -F, --framework             Specify the framework: react, angular, vue, react-native (default: react)"
    echo "  -f, --framework-version     Specify the framework version (default: latest)"
    echo "  -P, --pkg-manager           Specify the package manager: npm, yarn (default: npm)"
    echo "  -t, --tag                   Specify the Amplify UI version tag (default: latest)"
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

# Create MEGA_APP_NAME if none provided
if [[ -z "$MEGA_APP_NAME" ]]; then
  MEGA_APP_NAME="$FRAMEWORK-$FRAMEWORK_VERSION-$BUILD_TOOL-$BUILD_TOOL_VERSION-ui-$TAG"
fi

echo "##################"
echo "# Setup Mega App #"
echo "##################"

BASE_OPTIONS="--build-tool $BUILD_TOOL --name $MEGA_APP_NAME --framework $FRAMEWORK --framework-version $FRAMEWORK_VERSION"

# Create mega app
./scripts/mega-app-create-app.sh $BASE_OPTIONS --build-tool-version $BUILD_TOOL_VERSION 

# Copy files
./scripts/mega-app-copy-files.sh $BASE_OPTIONS

# Install dependencies
./scripts/mega-app-install.sh $BASE_OPTIONS --pkg-manager $PKG_MANAGER --tag $TAG

# Build mega app
./scripts/mega-app-build.sh $BASE_OPTIONS --platform $PLATFORM

# Run mega app
./scripts/mega-app-start.sh --build-tool $BUILD_TOOL --build-tool-version $BUILD_TOOL_VERSION --name $MEGA_APP_NAME --framework $FRAMEWORK
