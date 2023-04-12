#!/bin/bash

cd build-system-tests/mega-apps/${MEGA_APP_NAME}
if [ "$PKG_MANAGER" == 'yarn' ]; then
    echo "yarn version"
    yarn -v
    echo "yarn set version $PKG_MANAGER_VERSION"
    yarn set version $PKG_MANAGER_VERSION
    echo "yarn version"
    yarn -v
    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        yarn add $DEP_TYPES
    fi
    yarn add $DEPENDENCIES
    yarn build
else
    if [[ "$BUILD_TOOL" == 'cra' && "$LANGUAGE" == 'ts' ]]; then
        npm install $DEP_TYPES
    fi
    if [[ "$BUILD_TOOL" == 'next' && "$LANGUAGE" == '11' ]]; then
        rm -rf node_modules
    fi
    npm install $DEPENDENCIES
    npm run build
fi
