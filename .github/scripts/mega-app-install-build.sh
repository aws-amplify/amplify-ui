#!/bin/bash

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

if [ "$FRAMEWORK" == 'react' ]; then
    echo "\$DEPENDENCIES='\$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo @aws-amplify/ui-react-notifications'"
    DEPENDENCIES="$DEPENDENCIES react-dom@$FRAMEWORK_VERSION @aws-amplify/ui-react-storage @aws-amplify/ui-react-geo @aws-amplify/ui-react-notifications"
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

        echo "../../../.github/scripts/build-${PLATFORM}.sh $LOG_FILE $MEGA_APP_NAME $BUILD_TOOL"
        ../../../.github/scripts/build-${PLATFORM}.sh $LOG_FILE $MEGA_APP_NAME $BUILD_TOOL
    else
        if [[ "$BUILD_TOOL" == 'angular-lib' ]]; then
            echo "cd projects/my-amplify-ui-lib/"
            cd projects/my-amplify-ui-lib/
            echo "npm install --save-exact @aws-amplify/ui-angular aws-amplify"
            npm install --save-exact @aws-amplify/ui-angular aws-amplify
            echo "cd -"
            cd -
            echo "ng build my-amplify-ui-lib"
            ng build my-amplify-ui-lib
        fi

        echo "npm install --save-exact $DEPENDENCIES"
        npm install --save-exact $DEPENDENCIES

        # To prevent error: Expected identifier but found "="
        # details: https://github.com/aws-amplify/amplify-js/issues/11455
        if [[ "$FRAMEWORK" == 'angular' ]]; then
            # angular shouldn't be installed
            echo "npm remove angular"
            npm remove angular
            echo "rm -rf node_modules package-lock.json"
            rm -rf node_modules package-lock.json
            echo "npm install --force" # To prevent error: ERESOLVE unable to resolve dependency tree https://stackoverflow.com/questions/71582397/eresolve-unable-to-resolve-dependency-tree-while-installing-a-pacakge
            npm install --force
        fi

        echo "npm run build"
        npm run build
    fi
fi
