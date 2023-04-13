#!/bin/bash

cd build-system-tests
mkdir -p mega-apps/
cd mega-apps

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'js' ]]; then
    npx create-react-app ${MEGA_APP_NAME}
fi

if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
    npx create-react-app ${MEGA_APP_NAME} --template typescript
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    npx create-next-app ${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template react-ts
fi
