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

if [[ "$FRAMEWORK" == 'angular' ]]; then
    npm install -g @angular/cli@${BUILD_TOOL_VERSION}
    ng new $MEGA_APP_NAME --minimal --interactive=false
    if [ "$BUILD_TOOL" == 'angular-lib' ]; then
        cd $MEGA_APP_NAME
        ng generate library my-amplify-ui-lib
    fi
fi
