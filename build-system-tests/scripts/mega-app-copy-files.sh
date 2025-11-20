#!/bin/bash
set -e

# Default values
BUILD_TOOL="next"
MEGA_APP_NAME=""
FRAMEWORK="react"
FRAMEWORK_VERSION="latest"

# Options
# e.g.
# $ ./mega-app-copy-files.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest
# $ ./mega-app-copy-files.sh -B next -b latest -l typescript -n react-latest-next-latest-node-18-ts -F react -f latest
# $ ./mega-app-copy-files.sh -n react-latest-next-latest-node-18-ts

while [[ $# -gt 0 ]]; do
    case $1 in
    -B | --build-tool)
        BUILD_TOOL=$2
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

if [ "$BUILD_TOOL" == 'next' ]; then
    echo "cp templates/components/react/App.tsx mega-apps/${MEGA_APP_NAME}/pages/index.tsx"
    cp templates/components/react/App.tsx mega-apps/${MEGA_APP_NAME}/pages/index.tsx
fi

if [[ "$FRAMEWORK" == 'react' && "$BUILD_TOOL" == 'vite' ]]; then
    echo "cp templates/components/react/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx"
    cp templates/components/react/App.tsx mega-apps/${MEGA_APP_NAME}/src/App.tsx
    # See troubleshooting:
    # https://ui.docs.amplify.aws/react/getting-started/troubleshooting#vite
    echo "cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
    cp templates/components/react/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
fi

if [[ "$FRAMEWORK" == 'angular' ]]; then
    if [[ "$FRAMEWORK_VERSION" == "latest" || "$FRAMEWORK_VERSION" -gt 15 ]]; then
        USE_STANDALONE="true"
    else
        USE_STANDALONE="false"
    fi

    if [[ "$USE_STANDALONE" == "true" ]]; then
        echo "cp templates/components/angular/app-standalone.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts"
        cp templates/components/angular/app-standalone.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts

        echo "cp templates/components/angular/main-standalone.ts mega-apps/${MEGA_APP_NAME}/src/main.ts"
        cp templates/components/angular/main-standalone.ts mega-apps/${MEGA_APP_NAME}/src/main.ts

        if [ -f "mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts" ]; then
            echo "rm mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts"
            rm mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts
        fi

    else        
        echo "cp templates/components/angular/app-ngmodule.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts"
        cp templates/components/angular/app-ngmodule.component.ts mega-apps/${MEGA_APP_NAME}/src/app/app.component.ts

        
        echo "cp templates/components/angular/app.module.ts mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts"
        cp templates/components/angular/app.module.ts mega-apps/${MEGA_APP_NAME}/src/app/app.module.ts

        
        echo "cp templates/components/angular/main-ngmodule.ts mega-apps/${MEGA_APP_NAME}/src/main.ts"
        cp templates/components/angular/main-ngmodule.ts mega-apps/${MEGA_APP_NAME}/src/main.ts
    fi
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
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e \"this.projects[\\\"$MEGA_APP_NAME\\\"].architect.build.options.polyfills = this.projects[\\\"$MEGA_APP_NAME\\\"].architect.build.options.polyfills || []; this.projects[\\\"$MEGA_APP_NAME\\\"].architect.build.options.polyfills.push(\\\"src/polyfills.ts\\\")\""
        npx json -I -f mega-apps/${MEGA_APP_NAME}/angular.json -e "this.projects[\"$MEGA_APP_NAME\"].architect.build.options.polyfills = this.projects[\"$MEGA_APP_NAME\"].architect.build.options.polyfills || []; this.projects[\"$MEGA_APP_NAME\"].architect.build.options.polyfills.push(\"src/polyfills.ts\")"
        echo "strip comments from tsconfig.app.json and add polyfills.ts"
        echo "npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.app.json | npx json -a -e 'this.files.push(\"src/polyfills.ts\")' >tsconfig.app.json.tmp && mv tsconfig.app.json.tmp ./mega-apps/$MEGA_APP_NAME/tsconfig.app.json && rm -f tsconfig.app.json.tmp"
        npx strip-json-comments mega-apps/${MEGA_APP_NAME}/tsconfig.app.json | npx json -a -e 'this.files = this.files || []; this.files.push("src/polyfills.ts")' >tsconfig.app.json.tmp && mv tsconfig.app.json.tmp ./mega-apps/$MEGA_APP_NAME/tsconfig.app.json && rm -f tsconfig.app.json.tmp
    fi
    # Angular 14 is incompatible with @types/node > 20.11.7, so pin at this version
    if [[ "$FRAMEWORK_VERSION" == 14 ]]; then
        echo "pin @types/node version in mega-apps/${MEGA_APP_NAME}/package.json"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.dependencies["@types/node"] = "20.11.7"'"
        npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.dependencies["@types/node"] = "20.11.7"'

        # Add stylus overrides for Angular 14
        echo "Adding stylus overrides for Angular 14"
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.overrides = this.overrides || {}; this.overrides.stylus = \"github:stylus/stylus#0.59.0\"'"
        npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.overrides = this.overrides || {}; this.overrides.stylus = "github:stylus/stylus#0.59.0"'
        
        echo "npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.resolutions = this.resolutions || {}; this.resolutions.stylus = \"github:stylus/stylus#0.59.0\"'"
        npx json -I -f mega-apps/${MEGA_APP_NAME}/package.json -e 'this.resolutions = this.resolutions || {}; this.resolutions.stylus = "github:stylus/stylus#0.59.0"'
        
        echo "Stylus overrides added for Angular 14"
    fi
fi

if [[ "$FRAMEWORK" == 'vue' ]]; then
    # See Troubleshooting: https://ui.docs.amplify.aws/vue/getting-started/troubleshooting
    if [[ "$BUILD_TOOL" == 'vite' ]]; then
        echo "cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html"
        cp templates/components/vue/vite/index.html mega-apps/${MEGA_APP_NAME}/index.html
    fi

    if [[ "$BUILD_TOOL" == 'nuxt' ]]; then
        echo "cp templates/components/vue/nuxt/app.vue mega-apps/${MEGA_APP_NAME}/app/app.vue"
        cp templates/components/vue/nuxt/app.vue mega-apps/${MEGA_APP_NAME}/app/app.vue

        echo "cp templates/components/vue/nuxt/nuxt.config.ts mega-apps/${MEGA_APP_NAME}/nuxt.config.ts"
        cp templates/components/vue/nuxt/nuxt.config.ts mega-apps/${MEGA_APP_NAME}/nuxt.config.ts
    else
        echo "cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue"
        cp templates/components/vue/App.vue mega-apps/${MEGA_APP_NAME}/src/App.vue
    fi
fi

if [[ "$FRAMEWORK" == "react-native" ]]; then
    echo "cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx"
    cp templates/components/react-native/cli/App.tsx mega-apps/${MEGA_APP_NAME}/App.tsx
    echo "cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js"
    cp $AWS_EXPORTS_FILE mega-apps/${MEGA_APP_NAME}/aws-exports.js
    if [ "$BUILD_TOOL" == 'expo' ]; then
        # Fixes "Project must have a `android.package` set in the Expo config (app.json or app.config.js)."
        echo npx json -I -f mega-apps/${MEGA_APP_NAME}/app.json -e "this.expo.android.package = 'com.anonymous.${MEGA_APP_NAME}'; this.expo.ios.bundleIdentifier = 'com.anonymous.${MEGA_APP_NAME}';"
        npx json -I -f mega-apps/${MEGA_APP_NAME}/app.json -e "this.expo.android.package = 'com.anonymous.${MEGA_APP_NAME}'; this.expo.ios.bundleIdentifier = 'com.anonymous.${MEGA_APP_NAME}';"
    fi
fi
