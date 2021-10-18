# Amplify Spark (Angular)

## Getting Started

Please see [CONTRIBUTING.md](../../CONTRIBUTING.md#aws-amplifyui-angular) to get started.

## Development Structure

```bash
packages/angular/
├── projects/ui-angular/ # where the actual `@aws-amplify/ui-angular` library lives
│   ├── src/ # contains src files for UI library code.
│   ├── legacy/ # contains re-expors of legacy web component UI components
│   └── package.json # name: `@aws-amplify/ui-angular`, private: false
│                    # contains dependencies that library needs (e.g. xstate)
│
├── dist/ui-angular/ # this is auto-generated when we run `yarn angular build`.
|                    # deployment will happen from this folder only.
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
