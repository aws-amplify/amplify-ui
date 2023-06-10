#!/bin/bash

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="ts"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"

# Options
# -bt, --build-tool
#               Build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo
#               Default: cra
# -btv, --build-tool-version
#               Build tool version
#               Default: latest
# e.g.
# $ ./mega-app-create-app.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest
# $ ./mega-app-create-app.sh -bt react -btr latest -lang typescript -n react-latest-cra-latest-node-18-ts -fw cra -fwv latest
# $ ./mega-app-create-app.sh -n react-latest-cra-latest-node-18-ts

while [[ $# -gt 0 ]]; do
    case $1 in
    -bt | --build-tool)
        BUILD_TOOL=$2
        shift
        ;;
    -btr | --build-tool-version)
        BUILD_TOOL_VERSION=$2
        shift
        ;;
    -lang | --language)
        LANGUAGE=$2
        shift
        ;;
    -n | --name)
        MEGA_APP_NAME=$2
        shift
        ;;
    -fw | --framework)
        FRAMEWORK=$2
        shift
        ;;
    -fwv | --framework-version)
        FRAMEWORK_VERSION=$2
        shift
        ;;
    -h | --help)
        echo "Usage: mega-app-create-app.sh [OPTIONS]"
        echo "Options:"
        echo "  -bt, --build-tool          Specify the build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: cra)"
        echo "  -btr, --build-tool-version Specify the build tool version (default: latest)"
        echo "  -lang, --language          Specify the language: js, ts (default: js)"
        echo "  -n, --name                 Specify the mega app name (required)"
        echo "  -fw, --framework           Specify the framework: react, angular, vue, react-native (default: react)"
        echo "  -fwv, --framework-version  Specify the framework version (default: latest)"
        echo "  -h, --help                 Show help message"
        exit 0
        ;;
    *)
        echo "Unknown option: $1"
        exit 1
        ;;
    esac
    shift
done

# Check if MEGA_APP_NAME is provided
if [[ -z "$MEGA_APP_NAME" ]]; then
    echo "Please provide a name for the mega app using the -n or --name option."
    exit 1
fi

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
    elif [[ "$BUILD_TOOL" == "expo" ]]; then
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
