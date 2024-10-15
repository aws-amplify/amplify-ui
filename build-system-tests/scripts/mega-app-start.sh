#!/bin/bash
set -e

# Default values
BUILD_TOOL="next"
BUILD_TOOL_VERSION="latest"
MEGA_APP_NAME=""
FRAMEWORK="react"

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
    -h | --help)
        echo "Usage: mega-app-create-app.sh [OPTIONS]"
        echo "Options:"
        echo "  -B, --build-tool          Specify the build tool: next, vite, angular-cli, vue-cli, nuxt, react-native-cli, expo. (default: next)"
        echo "  -b, --build-tool-version Specify the build tool version (default: latest)"
        echo "  -n, --name                 Specify the mega app name (required)"
        echo "  -F, --framework           Specify the framework: react, angular, vue, react-native (default: react)"
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
echo "# Start Mega App #"
echo "###########################"

echo "cd ./mega-apps/${MEGA_APP_NAME}"
cd ./mega-apps/${MEGA_APP_NAME}

if [ "$BUILD_TOOL" == 'vite' ] || [ "$BUILD_TOOL" == 'nuxt' ]; then
    echo "npm run dev -- --port 3000 &"
    npm run dev -- --port 3000 &
elif [ "$FRAMEWORK" == 'vue' ]; then
    echo "npm run serve -- --port 3000 &"
    npm run serve -- --port 3000 &
else
    echo "npm run start -- --port 3000 &"
    npm run start -- --port 3000 &
fi

echo npx wait-on -t 20000 tcp:3000
npx wait-on -t 20000 tcp:3000

echo "Back to build-system-tests folder"
echo "cd .."
cd ..
