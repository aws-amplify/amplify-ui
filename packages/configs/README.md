# Overview

Base Configuration files for platform (example `@aws-amplify/ui-vue`) and utility packages (example `@aws-amplify/ui-react-core`) in the Amplify UI monorepo.

## Package Types

There are currently 3 types of packages that Amplify UI supports:

- **Utility Packages:** Packages shared across all platforms

  - `@aws-amplify/ui`

- **React Utility Packages:** Non-UI React utilites and hooks shared between React and React Native platform packages

  - `@aws-amplify/ui-react-core`

- **Platform UI Packages:**
  - `@aws-amplify/ui-angular`
  - `@aws-amplify/ui-react`
  - `@aws-amplify/ui-react-native`
  - `@aws-amplify/ui-vue`

## Typescript

To prevent drift between the `compilerOptions` of the _tsconfig.json_ files in the Amplify UI monorepo as more packages are added, base Typescript `compilerOptions` configurations are stored within the [ts](./ts) directory. The **[Base Config](./ts/tsconfig.base.json)** is extended directly or indirectly in all platform and utility packages.

- Utility package _tsconfig.json_ files directly use the **[Base Config](./ts/tsconfig.base.json)**
- React UI/React Utility package _tsconfig.json_ files use the **[React Base Config](./ts/tsconfig.react.json)**, extends from the **Base Config**
- React Native UI package _tsconfig.json_ files use the **[React Native Base Config](./ts/tsconfig.react-native.json)**, extends from the **Base Config**

A basic visualization of the extension hierarchy:

```tree
base.json
├── react.json
└── react-native.json
```

### Strict Mode

All packages are in TS strict mode by default unless opted out at the package configuration level.

### Usage of _tsconfig.dist.json_

To allow type checking and linting in _\_\_tests\_\__ and _\_\_mocks\_\__ directories during development, package level _tsconfig.json_ include all _.ts_ and _.tsx_ files. For builds, package level _tsconfig.dist.json_ files extend from their sibling _tsconfig.json_ file overriding the `excludes` value with the _\_\_tests\_\__ and _\_\_mocks\_\__ directories.

**Example:**

_react-core/tsconfig.json_

```json
{
  "extends": "../configs/ts/react.json",
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules"]
}
```

_react-core/tsconfig.dist.json_

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "**/__mocks__", "**/__tests__"]
}
```

## eslint

Amplify UI currently exposes the following custom `eslint` configs for extension:

- `eslint-config-amplify-ui`: base `eslint` configuration, includes `typescript`, `jest` and general rules. Intended for usage with platform agnostic **Utility Packages**
- `eslint-config-amplify-ui/react`: React/React Native `eslint` configuration, extends from the base configuration. Intended for usage with **React Utility/React UI/React Native UI Packages**
- `eslint-config-amplify-ui/jest`: jest specific `eslint` configuration and test file lint overrides. Intended for usage with packages utilizing jest for unit tests

> In the future, additional platform specific configs can be created for React Native, Vue, etc

### Usage

To use the `eslint` configs in an Amplify UI package, declare `eslint-config-amplify-ui` as a dev dependency and `eslint` as a direct dependency in the desired package _package.json_:

```json
{
  "devDependencies": {
    "eslint-config-amplify-ui": "0.0.0"
  },
  "dependencies": {
    "eslint": "^8.13.0"
  }
}
```

> Note the dependency version of `0.0.0`. Rather than publishing our custom `eslint` configs to NPM, we utilize the `workspaces` field of the top level [_package.json_](../../package.json) to allow our packages to use the configs during development.

**`eslint-config-amplify-ui`/`eslint-config-amplify-ui/react`**

Add the desired config to the `extends` field of the desired package _.eslintrc.js_, along with the noted `parserOptions`. The configs can be extended using either short (`'amplify-ui'`) or long (`'eslint-config-amplify-ui'`) form syntax:

**Short Form Syntax Example:**

```js
module.exports = {
  extends: ['amplify-ui'],
  parserOptions: {
    // point to local tsconfig
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
```

**Long Form Syntax Example:**

```js
module.exports = {
  extends: ['eslint-plugin-amplify-ui'],
  parserOptions: {
    // point to local tsconfig
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
```

**`eslint-config-amplify-ui/jest`**

To add the jest config for a package, add the following to the _.eslintrc.js_:

```js
module.exports = {
  // add to `overrides` to prevent jest rules from applying to entire package
  overrides: [
    {
      extends: ['amplify-ui/jest'],
      // only apply to files located in `__mocks__` and `__tests__` directories
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
}

