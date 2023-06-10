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

# Options
# e.g.
# $ ./mega-app-install.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest --pkg-manager npm --pkg-manager-version latest
# $ ./mega-app-install.sh -bt react -btr latest -lang typescript -n react-latest-cra-latest-node-18-ts -fw cra -fwv latest -pm npm -pmv latest
# $ ./mega-app-install.sh -n react-latest-cra-latest-node-18-ts

while [[ $# -gt 0 ]]; do
    case $1 in
    -bt | --build-tool)
        BUILD_TOOL=$2
        shift
        ;;
    -btr | --build-tool-version)
        BUILD_TOOL_VERSION=$2
        shift
        ;;
    -lang | --language)
        LANGUAGE=$2
        shift
        ;;
    -n | --name)
        MEGA_APP_NAME=$2
        shift
        ;;
    -fw | --framework)
        FRAMEWORK=$2
        shift
        ;;
    -fwv | --framework-version)
        FRAMEWORK_VERSION=$2
        shift
        ;;
    -pm | --pkg-manager)
        PKG_MANAGER=$2
        shift
        ;;
    -pmv | --pkg-manager-version)
        PKG_MANAGER_VERSION=$2
        shift
        ;;
    -h | --help)
        echo "Usage: mega-app-create-app.sh [OPTIONS]"
        echo "Options:"
        echo "  -bt, --build-tool            Specify the build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: cra)"
        echo "  -btr, --build-tool-version   Specify the build tool version (default: latest)"
        echo "  -lang, --language            Specify the language: js, ts (default: js)"
        echo "  -n, --name                   Specify the mega app name (required)"
        echo "  -fw, --framework             Specify the framework: react, angular, vue, react-native (default: react)"
        echo "  -fwv, --framework-version    Specify the framework version (default: latest)"
        echo "  -pm, --pkg-manager           Specify the package manager: npm, yarn (default: npm)"
        echo "  -pmv, --pkg-manager-version  Specify the package manager version (default: latest)"
        echo "  -h, --help                 Show help message"
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
    echo "Please provide a name for the mega app using the -n or --name option."
    exit 1
fi

##########################
# Start Mega App Install #
##########################

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

if [ "$FRAMEWORK" == 'react' ]; then
    # add react-dom
    echo "DEPENDENCIES='\$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo @aws-amplify/ui-react-notifications'"
    DEPENDENCIES="$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo @aws-amplify/ui-react-notifications"

    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        $DEP_TYPES="@types/react@$FRAMEWORK_VERSION @types/react-dom@$FRAMEWORK_VERSION"
        echo "yarn add $DEP_TYPES"
        yarn add $DEP_TYPES
    fi

elif [ "$FRAMEWORK" == 'angular' ]; then
    # remove angular since it's deprecated https://www.npmjs.com/package/angular
    # We've install @amplify/cli when creating the app
    echo "DEPENDENCIES="@aws-amplify/ui-$FRAMEWORK aws-amplify""
    DEPENDENCIES="@aws-amplify/ui-$FRAMEWORK aws-amplify"
fi

echo "Dependencies to be installed: $DEPENDENCIES"

if [ "$PKG_MANAGER" == 'yarn' ]; then
    echo "yarn version"
    yarn -v
    echo "yarn set version $PKG_MANAGER_VERSION"
    yarn set version $PKG_MANAGER_VERSION
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
        echo "npm install $DEP_TYPES"
        npm install $DEP_TYPES
    fi

    if [[ "$BUILD_TOOL" == 'next' && "$BUILD_TOOL_VERSION" == '11' ]]; then
        # We have to remove the initial downloaded node_modules for Next.js 11,
        # because create-next-app only creates the app with the latest version
        echo "rm -rf node_modules"
        rm -rf node_modules
    fi

    if [[ "$FRAMEWORK" == "react-native" ]]; then
        echo "npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill"
        npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill
    else
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES

        if [[ "$FRAMEWORK" == 'angular' ]]; then
            # To prevent Expected identifier but found "=", unable to publish app https://github.com/aws-amplify/amplify-js/issues/11455
            echo "rm -rf node_modules package-lock.json"
            rm -rf node_modules package-lock.json
            echo "npm install"
            npm install
        fi
    fi
fi
