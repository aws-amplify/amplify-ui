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
    echo "npm install -g @angular/cli@${BUILD_TOOL_VERSION}"
    npm install -g @angular/cli@${BUILD_TOOL_VERSION}
    echo "ng new $MEGA_APP_NAME --minimal --interactive=false"
    ng new $MEGA_APP_NAME --minimal --interactive=false
    if [ "$BUILD_TOOL" == 'angular-lib' ]; then
        echo "cd $MEGA_APP_NAME"
        cd $MEGA_APP_NAME
        echo "ng generate library my-amplify-ui-lib"
        ng generate library my-amplify-ui-lib
    fi
fi

if [[ "$FRAMEWORK" == 'vue' ]]; then
    echo "npm install -g @vue/cli@${BUILD_TOOL_VERSION}"
    npm install -g @vue/cli@${BUILD_TOOL_VERSION}
    if [ "$BUILD_TOOL" == 'vue-cli' ]; then
        echo "vue create --preset ../templates/components/vue/preset-${FRAMEWORK_VERSION}.json $MEGA_APP_NAME"
        vue create --preset ../templates/components/vue/preset-${FRAMEWORK_VERSION}.json $MEGA_APP_NAME
    fi
fi
