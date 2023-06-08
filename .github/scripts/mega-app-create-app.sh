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
    echo "npx create-next-app ${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint --no-app"
    npx create-next-app ${MEGA_APP_NAME} --ts --no-src-dir --no-experimental-app --no-eslint --no-app
fi

if [ "$BUILD_TOOL" == 'vite' ]; then
    echo "npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template ${FRAMEWORK}-ts"
    npm create vite@${BUILD_TOOL_VERSION} $MEGA_APP_NAME -- --template ${FRAMEWORK}-ts
fi

if [[ "$FRAMEWORK" == 'angular' ]]; then
    echo "npm install -g @angular/cli@${BUILD_TOOL_VERSION}"
    npm install -g @angular/cli@${BUILD_TOOL_VERSION}
    echo "ng new $MEGA_APP_NAME --interactive=false"
    ng new $MEGA_APP_NAME --interactive=false
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
    elif [ "$BUILD_TOOL" == 'nuxt' ]; then
        npx nuxt init $MEGA_APP_NAME
    fi
fi

if [[ "$FRAMEWORK" == 'react-native' ]]; then
    echo "rm -rf $MEGA_APP_NAME" # Remove $MEGA_APP_NAME if it exists
    rm -rf $MEGA_APP_NAME
    if [[ "$BUILD_TOOL" == 'cli' ]]; then
        echo "npx react-native@${BUILD_TOOL_VERSION} init $MEGA_APP_NAME --version $FRAMEWORK_VERSION"
        npx react-native@${BUILD_TOOL_VERSION} init $MEGA_APP_NAME --version $FRAMEWORK_VERSION
        # React-Native, since 0.71.8,
        # no longer shows warning "npm WARN exec The following package was not found and will be installed: react-native@0.71.8",
        # so we log the package.json to check the versions
        echo "cd $MEGA_APP_NAME"
        cd $MEGA_APP_NAME
        echo "npm list react-native"
        npm list react-native
    elif [[ "$BUILD_TOOL" == 'expo' ]]; then
        echo "npx create-expo-app $MEGA_APP_NAME --template expo-template-blank-typescript"
        npx create-expo-app $MEGA_APP_NAME --template expo-template-blank-typescript
        echo "cd $MEGA_APP_NAME"
        cd $MEGA_APP_NAME
        echo "cat package.json" # Log the package.json to check the expo version should be later than 48.0.19
        cat package.json
        echo "npx expo-env-info"
        npx expo-env-info
    fi
fi
