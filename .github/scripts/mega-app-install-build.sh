#!/bin/bash

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

if [ "$FRAMEWORK" == 'react' ]; then
    echo "\$DEPENDENCIES='\$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo react-map-gl @aws-amplify/ui-react-notifications'"
    DEPENDENCIES="$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo react-map-gl @aws-amplify/ui-react-notifications"
    echo "Dependencies to be installed: $DEPENDENCIES"
fi

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
        echo "npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill"
        npm install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context amazon-cognito-identity-js @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill

        echo "../../../.github/scripts/build-${PLATFORM}.sh $LOG_FILE"
        ../../../.github/scripts/build-${PLATFORM}.sh $LOG_FILE $MEGA_APP_NAME
    else
        if [[ "$BUILD_TOOL" == 'angular-lib' ]]; then
            echo "cd projects/my-amplify-ui-lib/"
            cd projects/my-amplify-ui-lib/
            echo "npm install --save-peer @aws-amplify/ui-angular aws-amplify"
            npm install --save-peer @aws-amplify/ui-angular aws-amplify
            echo "cd -"
            cd -
            echo "npm install $DEPENDENCIES"
            npm install $DEPENDENCIES
            echo "ng build my-amplify-ui-lib"
            ng build my-amplify-ui-lib
        fi
        echo "npm install $DEPENDENCIES"
        npm install $DEPENDENCIES
        echo "npm run build"
        npm run build
    fi
fi
