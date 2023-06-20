#!/bin/bash

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="ts"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"
PLATFORM="android"
LOG_FILE="test.log"

# Options
# e.g.
# $ ./mega-app-build.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm
# $ ./mega-app-build.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest -P npm
# $ ./mega-app-build.sh -n react-latest-cra-latest-node-18-ts

while [[ $# -gt 0 ]]; do
    case $1 in
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
    -A | --platform)
        PLATFORM=$2
        shift
        ;;
    -h | --help)
        echo "Usage: mega-app-create-app.sh [OPTIONS]"
        echo "Options:"
        echo "  -B, --build-tool            Specify the build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: cra)"
        echo "  -b, --build-tool-version    Specify the build tool version (default: latest)"
        echo "  -l, --language              Specify the language: js, ts (default: js)"
        echo "  -n, --name                  Specify the mega app name (required)"
        echo "  -F, --framework             Specify the framework: react, angular, vue, react-native (default: react)"
        echo "  -f, --framework-version     Specify the framework version (default: latest)"
        echo "  -P, --pkg-manager           Specify the package manager: npm, yarn (default: npm)"
        echo "  -A, --platform              Specify the platform: android, ios (default: android)"
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

echo "########################"
echo "# Start Mega App Build #"
echo "########################"

echo "cd ./mega-apps/${MEGA_APP_NAME}"
cd ./mega-apps/${MEGA_APP_NAME}

if [ "$PKG_MANAGER" == 'yarn' ]; then
    echo "yarn build"
    yarn build
else
    if [[ "$FRAMEWORK" == "react-native" ]]; then
        echo "Back to build-system-tests folder"
        echo "cd -"
        cd -
        echo "./scripts/build-${PLATFORM}.sh $LOG_FILE $MEGA_APP_NAME $BUILD_TOOL"
        ./scripts/build-${PLATFORM}.sh $LOG_FILE $MEGA_APP_NAME $BUILD_TOOL
    else
        echo "npm run build"
        npm run build
    fi
fi
