#!/bin/bash
set -e

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

echo "#######################"
echo "# Start Copying Files #"
echo "#######################"

if [ "$FRAMEWORK" == "react-native" ]; then
    AWS_EXPORTS_FILE="templates/template-react-native-aws-exports.js"
else
    AWS_EXPORTS_FILE="templates/template-aws-exports.js"
    AWS_EXPORTS_DECLARATION_FILE="templates/template-aws-exports.d.ts"
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
fi

if [[ "$FRAMEWORK" == 'react' && "$BUILD_TOOL" == 'vite' ]]; then
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.js
    echo "cp $AWS_EXPORTS_DECLARATION_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.d.ts"
    cp $AWS_EXPORTS_DECLARATION_FILE mega-apps/${MEGA_APP_NAME}/src/aws-exports.d.ts
    echo "cp templates/components/react/vite/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx"
    cp templates/components/react/vite/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx

    # See troubleshooting:
    # https://ui.docs.amplify.aws/react/getting-started/troubleshooting#vite
    echo "cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
    cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
    echo "cp templates/components/react/vite/template-tsconfig-vite-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.app.json"
    cp templates/components/react/vite/template-tsconfig-vite-${BUILD_TOOL_VERSION}.json mega-apps/${MEGA_APP_NAME}/tsconfig.app.json
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
    # Angular 14 is incompatible with @types/node > 20.11.7, so pin at this version
    if [[ "$FRAMEWORK_VERSION" == 14 ]]; then
        echo "pin @types/node version in mega-apps/${MEGA_APP_NAME}/package.json"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.dependencies["@types/node"] = "20.11.7"'"
        npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.dependencies["@types/node"] = "20.11.7"'
    fi

fi

if [[ "$FRAMEWORK" == 'vue' ]]; then
    AWS_EXPORTS_PATH="mega-apps/${MEGA_APP_NAME}/src/aws-exports.js"
    AWS_EXPORTS_DECLARATION_PATH="mega-apps/${MEGA_APP_NAME}/src/aws-exports.d.ts"

    # See Troubleshooting: https://ui.docs.amplify.aws/vue/getting-started/troubleshooting
    if [[ "$BUILD_TOOL" == 'vite' ]]; then
        echo "cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
        cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
        echo "cp templates/components/vue/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts"
        cp templates/components/vue/vite/vite.config.ts mega-apps/${MEGA_APP_NAME}/vite.config.ts
    fi

    if [[ "$BUILD_TOOL" == 'nuxt' ]]; then
        # nuxt doesn't use the src/ directory
        echo "cp templates/components/vue/nuxt/* mega-apps/${MEGA_APP_NAME}/"
        cp templates/components/vue/nuxt/* mega-apps/${MEGA_APP_NAME}/

        AWS_EXPORTS_PATH="mega-apps/${MEGA_APP_NAME}/aws-exports.js"
        AWS_EXPORTS_DECLARATION_PATH="mega-apps/${MEGA_APP_NAME}/aws-exports.d.ts"
    else
        echo "cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue"
        cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue
    fi

    echo "cp $AWS_EXPORTS_FILE $AWS_EXPORTS_PATH"
    cp $AWS_EXPORTS_FILE $AWS_EXPORTS_PATH
    echo "cp $AWS_EXPORTS_DECLARATION_FILE $AWS_EXPORTS_DECLARATION_PATH"
    cp $AWS_EXPORTS_DECLARATION_FILE $AWS_EXPORTS_DECLARATION_PATH
fi

if [[ "$FRAMEWORK" == "react-native" ]]; then
    echo "cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx"
    cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js
fi
