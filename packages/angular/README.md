# Amplify Spark (Angular)

## Getting Started

To build:

```bash
yarn build
```

To build and watch for changes:

```bash
yarn build --watch
```

## Development Structure

```bash
packages/angular/
├── projects/ui-angular/ # where the actual `@aws-amplify/ui-angular` library lives
│   ├── src/ # contains src files for actual library code.
│   └── package.json # name: `@aws-amplify/ui-angular`, private: false
│                    # contains dependencies that library needs (e.g. xstate)
│
├── dist/ui-angular/
│   └── bundles/
│   └── esm2015/
│   └── fesm2015/
│   └── lib/
│   └── package.json # same as the above, but defines extra fields like
│                    # main, module, esm2015, typings, sideEffects.
│
└── package.json # name: 'amplify-ui-angular-mono`, private: true
                 # contains base dependencies for developing angular packages.
                 # This is only for infrastructure purpose! Shouldn't be
                 # published or be referenced by other dependencies.
```
