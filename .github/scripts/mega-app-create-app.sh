#!/bin/bash

echo "cd build-system-tests"
cd build-system-tests
echo "mkdir -p mega-apps/"
mkdir -p mega-apps/
echo "cd mega-apps"
cd mega-apps

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'js' ]]; then
    echo "npx create-react-app ${MEGA_APP_NAME}"
    npx create-react-app ${MEGA_APP_NAME}
fi

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
    echo "npx create-react-app ${MEGA_APP_NAME} --template typescript"
    npx create-react-app ${MEGA_APP_NAME} --template typescript
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    echo "npx create-next-app ${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint"
    npx create-next-app ${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    echo "npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template react-ts"
    npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template react-ts
fi

if [[ "$BUILD_TOOL" == 'cli' && "$FRAMEWORK" == 'react-native' ]]; then
    MEGA_APP_NAME="rn${FRAMEWORK_VERSION}Cli${BUILD_TOOL_VERSION}Node18Ts"
    echo "npx react-native@${BUILD_TOOL_VERSION} init $MEGA_APP_NAME --version $FRAMEWORK_VERSION"
    npx react-native@${BUILD_TOOL_VERSION} init $MEGA_APP_NAME --version $FRAMEWORK_VERSION
fi
