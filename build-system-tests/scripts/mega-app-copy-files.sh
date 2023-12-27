#!/bin/bash

# Default values
BUILD_TOOL="cra"
BUILD_TOOL_VERSION="latest"
LANGUAGE="js"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"

# Options
# e.g.
# $ ./mega-app-copy-files.sh --build-tool react --build-tool-version latest --language typescript --name react-latest-cra-latest-node-18-ts --framework cra --framework-version latest
# $ ./mega-app-copy-files.sh -B react -b latest -l typescript -n react-latest-cra-latest-node-18-ts -F cra -f latest
# $ ./mega-app-copy-files.sh -n react-latest-cra-latest-node-18-ts

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

echo "#######################"
echo "# Start Copying Files #"
echo "#######################"

if [ "$FRAMEWORK" == "react-native" ]; then
    AWS_EXPORTS_FILE="templates/template-react-native-aws-exports.js"
else
    AWS_EXPORTS_FILE="templates/template-aws-exports.js"
fi

echo "Installing json and strip-json-comments"
echo "npm install"
npm install

if [ "$BUILD_TOOL" == 'cra' ]; then
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    if [ "$LANGUAGE" == 'js' ]; then
        echo "cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.js"
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.js
    else
        echo "cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx"
        cp templates/components/react/cra/App.js mega-apps/${MEGA_APP_NAME}/src/App.tsx
        if [ "$FRAMEWORK_VERSION" == '16' ]; then
            # We have to customize the index.tsx file for React 16 because the render API changed since React 18.
            # See more: https://legacy.reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
            echo "cp templates/components/react/cra/index-react-${FRAMEWORK_VERSION}.js mega-apps/${MEGA_APP_NAME}/src/index.tsx"
            cp templates/components/react/cra/index-react-${FRAMEWORK_VERSION}.js mega-apps/${MEGA_APP_NAME}/src/index.tsx
        fi
    fi
fi

if [ "$BUILD_TOOL" == 'next' ]; then
    echo "mkdir mega-apps/${MEGA_APP_NAME}/data"
    mkdir mega-apps/${MEGA_APP_NAME}/data
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/data/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/data/aws-exports.js
    echo "cp templates/components/react/next/App.js mega-apps/${MEGA_APP_NAME}/pages/index.tsx"
    cp templates/components/react/next/App.js mega-apps/${MEGA_APP_NAME}/pages/index.tsx
    if [ "$BUILD_TOOL_VERSION" == '11' ]; then
        # We have to customize the package.json and tsconfig.json for Next.js 11,
        # because create-next-app only creates the app with the latest version
        echo "cp templates/components/react/next/template-package-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/package.json"
        cp templates/components/react/next/template-package-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/package.json
        echo "cp templates/components/react/next/template-tsconfig-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json"
        cp templates/components/react/next/template-tsconfig-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    fi
fi

if [[ "$FRAMEWORK" == 'react' && "$BUILD_TOOL" == 'vite' ]]; then
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    echo "cp templates/components/react/vite/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx"
    cp templates/components/react/vite/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx

    # See troubleshooting:
    # https://ui.docs.amplify.aws/react/getting-started/troubleshooting#vite
    echo "cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
    cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
    echo "cp templates/components/react/vite/template-tsconfig-vite-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json"
    cp templates/components/react/vite/template-tsconfig-vite-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.json
    echo "cp templates/components/react/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts"
    cp templates/components/react/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts
fi

if [[ "$FRAMEWORK" == 'angular' ]]; then
    echo "cp templates/components/angular/app-angular-${FRAMEWORK_VERSION}.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts"
    cp templates/components/angular/app-angular-${FRAMEWORK_VERSION}.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts
    echo "cp templates/components/angular/app.module.ts mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts"
    cp templates/components/angular/app.module.ts mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts
    echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e \"this.projects[\\\"$MEGA_APP_NAME\\\"].architect.build.options.styles.push(\\\"node_modules/@aws-amplify/ui-angular/theme.css\\\")\""
    npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e "this.projects[\"$MEGA_APP_NAME\"].architect.build.options.styles.push(\"node_modules/@aws-amplify/ui-angular/theme.css\")"
    npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e "this.projects[\"$MEGA_APP_NAME\"].architect.build.configurations.production.budgets = [{\"type\":\"initial\",\"maximumWarning\":\"600kb\",\"maximumError\":\"1.5mb\"},{\"type\":\"anyComponentStyle\",\"maximumWarning\":\"2kb\",\"maximumError\":\"4kb\"}]"

    # The following change is to test change polyfills so that the app works in browser in local.
    # See more: https://ui.docs.amplify.aws/angular/getting-started/troubleshooting
    echo "Change polyfills.ts"
    echo "cp templates/components/angular/polyfills-appendix.ts mega-apps/${MEGA_APP_NAME}/src/polyfills.ts"
    cat ./templates/components/angular/polifills-appendix.ts >>mega-apps/${MEGA_APP_NAME}/src/polyfills.ts
    if [[ "$FRAMEWORK_VERSION" -gt 15 || "$FRAMEWORK_VERSION" == "latest" ]]; then
        echo "add polyfills to angular.json"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e \"this.projects[\\\"$MEGA_APP_NAME\\\"].architect.build.options.polyfills.push(\\\"src/polyfills.ts\\\")\""
        npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e "this.projects[\"$MEGA_APP_NAME\"].architect.build.options.polyfills.push(\"src/polyfills.ts\")"
        echo "strip comments from tsconfig.app.json and add polyfills.ts"
        echo "npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.app.json | npx json -a -e 'this.files.push(\"src/polyfills.ts\")' >tsconfig.app.json.tmp && mv tsconfig.app.json.tmp ./mega-apps/$MEGA_APP_NAME/tsconfig.app.json && rm -f tsconfig.app.json.tmp"
        npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.app.json | npx json -a -e 'this.files.push("src/polyfills.ts")' >tsconfig.app.json.tmp && mv tsconfig.app.json.tmp ./mega-apps/$MEGA_APP_NAME/tsconfig.app.json && rm -f tsconfig.app.json.tmp
    fi
fi

if [[ "$FRAMEWORK" == 'vue' ]]; then
    echo "cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue"
    cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js

    # remove comments from JSON files because `json` package can't process comments
    echo "npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.json >tmpfile && mv tmpfile mega-apps/${MEGA_APP_NAME}/tsconfig.json && rm -f tmpfile"
    npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.json >tmpfile && mv tmpfile mega-apps/${MEGA_APP_NAME}/tsconfig.json && rm -f tmpfile

    # See Troubleshooting: https://ui.docs.amplify.aws/vue/getting-started/troubleshooting
    if [[ "$BUILD_TOOL" == 'vite' ]]; then
        echo "cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
        cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
        echo "cp templates/components/vue/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts"
        cp templates/components/vue/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts
    fi

    if [[ "$BUILD_TOOL" == 'nuxt' ]]; then
        echo "cp templates/components/vue/nuxt/* mega-apps/${MEGA_APP_NAME}/"
        cp templates/components/vue/nuxt/* mega-apps/${MEGA_APP_NAME}/

        echo "add allowJs: true to tsconfig for aws-exports.js"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/tsconfig.json -e \"this.allowJs=true\""
        npx json -I -f mega-apps/${MEGA_APP_NAME}/tsconfig.json -e "this.allowJs=true"
    else
        echo "add allowJs: true to tsconfig for aws-exports.js"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/tsconfig.json -e \"this.compilerOptions.allowJs=true\""
        npx json -I -f mega-apps/${MEGA_APP_NAME}/tsconfig.json -e "this.compilerOptions.allowJs=true"
    fi
fi

if [[ "$FRAMEWORK" == "react-native" ]]; then
    echo "cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx"
    cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js
fi
