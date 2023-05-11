#!/bin/bash

if [[ "$BUILD_TOOL" == 'cli' && "$FRAMEWORK" == 'react-native' ]]; then
    MEGA_APP_NAME="rn${FRAMEWORK_VERSION}Cli${BUILD_TOOL_VERSION}Node18Ts${PLATFORM}"
fi

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
        echo "ls -la"
        ls -la
        echo "npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill"
        npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill
        if [[ "$PLATFORM" == "ios" ]]; then
            echo "SIMULATOR_ID=$(xcrun simctl getenv "iPhone 14" SIMULATOR_UDID)"
            SIMULATOR_ID=$(xcrun simctl getenv "iPhone 14" SIMULATOR_UDID)
            echo "echo $SIMULATOR_ID"
            echo $SIMULATOR_ID
            echo "xcrun simctl boot $SIMULATOR_ID"
            xcrun simctl boot $SIMULATOR_ID
            echo "npm install $DEPENDENCIES"
            npm install $DEPENDENCIES
            echo "npm run $PLATFORM"
            npm run $PLATFORM
        else
            cp ../../../.github/scripts/build-android.sh ./build-android.sh
            ./build-android.sh $LOG_FILE
        fi
    else
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES
        echo "npm run build"
        npm run build
    fi
fi
