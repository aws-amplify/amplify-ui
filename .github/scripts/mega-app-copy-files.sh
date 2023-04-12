#!/bin/bash

cd build-system-tests
if [ "$BUILD_TOOL" == 'cra' ]; then
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    if [ "$LANGUAGE" == 'js' ]; then
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.js
    else
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx
        if [ "$FRAMEWORK_VERSION" == '16' ]; then
            cp templates/components/react/cra/index-react-${FRAMEWORK_VERSION}.js mega-apps/${MEGA_APP_NAME}/src/index.tsx
        fi
    fi
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    mkdir mega-apps/${MEGA_APP_NAME}/data
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/data/aws-exports.js
    cp templates/components/react/next/App.js mega-apps/${MEGA_APP_NAME}/pages/index.tsx
    if [ "$BUILD_TOOL_VERSION" == '11' ]; then
        cp templates/components/react/next/template-package-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/package.json
        cp templates/components/react/next/template-tsconfig-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    fi
fi

if [ "$BUILD_TOOL" == 'gatsby' ]; then
    templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/src/pages/aws-exports.js
    cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/pages/index.tsx
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    cp templates/template-aws-exports.js mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx
    cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
    cp templates/components/react/vite/template-tsconfig.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    cp templates/components/react/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts
fi
