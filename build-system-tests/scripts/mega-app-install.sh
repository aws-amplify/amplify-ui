#!/bin/bash
set -e

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="ts"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"
PKG_MANAGER="npm"
PKG_MANAGER_VERSION="latest"
TAG="latest"

# Import install function
source "./scripts/install-dependencies-with-retries.sh"

# Options
# e.g.
# $ ./mega-app-install.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm --pkg-manager-version latest
# $ ./mega-app-install.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest -P npm -p latest
# $ ./mega-app-install.sh -n react-latest-cra-latest-node-18-ts

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
    -p | --pkg-manager-version)
        PKG_MANAGER_VERSION=$2
        shift
        ;;
    -t | --tag)
        TAG=$2
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
        echo "  -p, --pkg-manager-version   Specify the package manager version (default: latest)"
        echo "  -t, --tag                   Specify the tag (default: latest)"
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

echo "##########################"
echo "# Start Mega App Install #"
echo "##########################"

TAGGED_UI_FRAMEWORK="@aws-amplify/ui-$FRAMEWORK@$TAG"
DEPENDENCIES="$FRAMEWORK@$FRAMEWORK_VERSION $TAGGED_UI_FRAMEWORK aws-amplify"

echo "cd ./mega-apps/${MEGA_APP_NAME}"
cd "./mega-apps/${MEGA_APP_NAME}"

if [ "$FRAMEWORK" == 'react' ]; then
    # add react-dom
    DEPENDENCIES="$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage@$TAG @aws-amplify/ui-react-geo@$TAG @aws-amplify/ui-react-notifications@$TAG @aws-amplify/geo"
    echo "DEPENDENCIES=$DEPENDENCIES"
    
    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        DEP_TYPES="@types/react@$FRAMEWORK_VERSION @types/react-dom@$FRAMEWORK_VERSION"
        echo "DEP_TYPES='$DEP_TYPES'"
    fi

elif [ "$FRAMEWORK" == 'angular' ]; then
    # remove angular since it's deprecated https://www.npmjs.com/package/angular
    # We've install @amplify/cli when creating the app
    DEPENDENCIES="$TAGGED_UI_FRAMEWORK aws-amplify"
    echo "DEPENDENCIES=$DEPENDENCIES"
fi

if [ "$PKG_MANAGER" == 'yarn' ]; then
    echo "yarn version"
    yarn -v
    echo "yarn set version $PKG_MANAGER_VERSION"
    yarn set version "$PKG_MANAGER_VERSION"
    echo "yarn version"
    yarn -v
    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        echo "yarn add $DEP_TYPES"
        yarn add $DEP_TYPES
    fi
    echo "yarn add $DEPENDENCIES"
    yarn add $DEPENDENCIES
else
    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        # If not testing the latest React, we need to download its types.
        # CRA is the only framework that we test React 16.
        install_dependencies_with_retries npm "$DEP_TYPES"
    fi

    if [[ "$FRAMEWORK" == "react-native" ]]; then
        DEPENDENCIES="$TAGGED_UI_FRAMEWORK @aws-amplify/react-native aws-amplify react-native-safe-area-context @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill"
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES
        if [[ "$BUILD_TOOL" == "expo" ]]; then
            echo "npx expo install --fix" 
            npx expo install --fix # fix the dependencies that are incompatible with the installed expo versio
        fi
    else
        install_dependencies_with_retries npm "$DEPENDENCIES"
    fi
fi

echo "Back to build-system-tests folder"
echo "cd ../../"
cd ../../
