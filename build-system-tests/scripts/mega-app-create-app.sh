#!/bin/bash

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="ts"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"

# Options
# e.g.
# $ ./mega-app-create-app.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest
# $ ./mega-app-create-app.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest
# $ ./mega-app-create-app.sh -n react-latest-cra-latest-node-18-ts

while [[ $# -gt 0 ]]; do
    case $1 in
    -B | --build-tool)
        BUILD_TOOL=$2
        shift
        ;;
    -b | --build-tool-version)
        BUILD_TOOL_VERSION=$2
        shift
        ;;
    -l | --language)
        LANGUAGE=$2
        shift
        ;;
    -n | --name)
        MEGA_APP_NAME=$2
        shift
        ;;
    -F | --framework)
        FRAMEWORK=$2
        shift
        ;;
    -f | --framework-version)
        FRAMEWORK_VERSION=$2
        shift
        ;;
    -h | --help)
        echo "Usage: mega-app-create-app.sh [OPTIONS]"
        echo "Options:"
        echo "  -B, --build-tool          Specify the build tool: cra, next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: cra)"
        echo "  -b, --build-tool-version Specify the build tool version (default: latest)"
        echo "  -l, --language          Specify the language: js, ts (default: js)"
        echo "  -n, --name                 Specify the mega app name (required)"
        echo "  -F, --framework           Specify the framework: react, angular, vue, react-native (default: react)"
        echo "  -f, --framework-version  Specify the framework version (default: latest)"
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
    MEGA_APP_NAME="$FRAMEWORK-$FRAMEWORK_VERSION-$BUILD_TOOL-$BUILD_TOOL_VERSION-$LANGUAGE"
fi

echo "###########################"
echo "# Start Creating Mega App #"
echo "###########################"

echo "mkdir -p mega-apps/"
mkdir -p mega-apps/
echo "cd mega-apps"
cd mega-apps

# Create a blank package.json
# Otherwise mega-apps will be automatically created in build-system-tests/ folder even if we cd into mega-apps/ folder.
echo "echo "{}" >package.json"
echo "{}" >package.json

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
    echo "npx @angular/cli@${BUILD_TOOL_VERSION} new $MEGA_APP_NAME --interactive=false"
    npx @angular/cli@${BUILD_TOOL_VERSION} new $MEGA_APP_NAME --interactive=false
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
        echo "npm list expo" # Log the package.json to check the expo version should be later than 48.0.19
        npm list expo
        echo "npx expo-env-info"
        npx expo-env-info
    fi
fi

echo "Back to build-system-tests folder"
echo "cd .."
cd ..
