#!/bin/bash

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}
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
    echo "yarn build"
    yarn build
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
        echo "npm i -g expo-cli"
        npm i -g expo-cli
        echo "ls -la"
        ls -la
        echo "xcrun simctl list --json"
        xcrun simctl list --json
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES
        echo "npx expo client:install:ios"
        npx expo client:install:ios
        echo "npm run ios"
        npm run ios
    else
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES
        echo "npm run build"
        npm run build
    fi
fi
