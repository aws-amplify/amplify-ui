#!/bin/bash

cd build-system-tests
mkdir -p mega-apps/

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'js' ]]; then
    npx create-react-app mega-apps/${MEGA_APP_NAME}
fi

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
    npx create-react-app mega-apps/${MEGA_APP_NAME} --template typescript
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    npx create-next-app mega-apps/${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint
fi

if [ "$BUILD_TOOL" == 'gatsby' ]; then
    cd mega-apps
    npx create-gatsby@latest -y $MEGA_APP_NAME
    cd ..
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    cd mega-apps
    npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template react-ts
    cd ..
fi
