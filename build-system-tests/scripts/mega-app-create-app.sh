#!/bin/bash
set -e

# Default values
BUILD_TOOL="next"
BUILD_TOOL_VERSION="latest"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"

# Options
# e.g.
# $ ./mega-app-create-app.sh --build-tool react --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework next --framework-version latest
# $ ./mega-app-create-app.sh -B react -b latest -l typescript -n react-latest-next-latest-node-18-ts -F next -f latest
# $ ./mega-app-create-app.sh -n react-latest-next-latest-node-18-ts

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
        echo "  -B, --build-tool          Specify the build tool: next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: next)"
        echo "  -b, --build-tool-version Specify the build tool version (default: latest)"
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

if [ "$BUILD_TOOL" == 'next' ]; then
    echo "npx create-next-app@${BUILD_TOOL_VERSION} ${MEGA_APP_NAME} --yes --ts --no-src-dir --no-experimental-app --no-eslint --no-app --no-tailwind --no-turbopack --webpack"
    npx create-next-app@${BUILD_TOOL_VERSION} ${MEGA_APP_NAME} --yes --ts --no-src-dir --no-experimental-app --no-eslint --no-app --no-tailwind --no-turbopack --webpack
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
    if [ "$BUILD_TOOL" == 'vue-cli' ]; then
        echo "npm install -g @vue/cli@${BUILD_TOOL_VERSION}"
        npm install -g @vue/cli@${BUILD_TOOL_VERSION}
        echo "vue create --preset ../templates/components/vue/preset-${FRAMEWORK_VERSION}.json $MEGA_APP_NAME"
        echo 'Y' | vue create --preset ../templates/components/vue/preset-${FRAMEWORK_VERSION}.json $MEGA_APP_NAME
    elif [ "$BUILD_TOOL" == 'nuxt' ]; then
        echo "npx nuxi@latest init $MEGA_APP_NAME -t v4-compat"
        npx nuxi@latest init $MEGA_APP_NAME -t v4-compat
    fi
fi

if [[ "$FRAMEWORK" == 'react-native' ]]; then
    echo "rm -rf $MEGA_APP_NAME" # Remove $MEGA_APP_NAME if it exists
    rm -rf $MEGA_APP_NAME
    if [[ "$BUILD_TOOL" == 'cli' ]]; then
        if [[ $BUILD_TOOL_VERSION == 9 ]]; then # RN CLI v9 doesn't recognize --pm flag
            echo "npx @react-native-community/cli@$BUILD_TOOL_VERSION init $MEGA_APP_NAME --version $FRAMEWORK_VERSION"
            npx @react-native-community/cli@$BUILD_TOOL_VERSION init $MEGA_APP_NAME --version $FRAMEWORK_VERSION
        else # --pm flag fixes https://github.com/CocoaPods/CocoaPods/issues/12546
            echo "npx @react-native-community/cli@$BUILD_TOOL_VERSION init $MEGA_APP_NAME --version $FRAMEWORK_VERSION --pm npm"
            npx @react-native-community/cli@$BUILD_TOOL_VERSION init $MEGA_APP_NAME --version $FRAMEWORK_VERSION --pm npm
        fi
        # React-Native, since 0.71.8,
        # no longer shows warning "npm WARN exec The following package was not found and will be installed: react-native@0.71.8",
        # so we log the package.json to check the versions
        echo "cd $MEGA_APP_NAME"
        cd $MEGA_APP_NAME
        echo "npm list react-native"
        npm list react-native
    elif [[ "$BUILD_TOOL" == "expo" ]]; then
        echo "npx create-expo-app $MEGA_APP_NAME --template expo-template-blank-typescript@$BUILD_TOOL_VERSION"
        npx create-expo-app $MEGA_APP_NAME --template expo-template-blank-typescript@$BUILD_TOOL_VERSION
        echo "cd $MEGA_APP_NAME"
        cd $MEGA_APP_NAME
        echo "npm list expo" # Log the package.json to check the expo version
        npm list expo
        echo "npx expo-env-info"
        npx expo-env-info
    fi
fi

echo "Back to build-system-tests folder"
echo "cd .."
cd ..
