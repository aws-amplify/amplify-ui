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

To allow type support and linting in _\_\_tests\_\__ and _\_\_mocks\_\__ directories during development, package level _tsconfig.json_ include all _.ts_ and _.tsx_ files. For builds, package level _tsconfig.dist.json_ files extend from their sibling _tsconfig.json_ file overriding the `excludes` value with the _\_\_tests\_\__ and _\_\_mocks\_\__ directories.

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
