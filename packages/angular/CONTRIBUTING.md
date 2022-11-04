# Contributing

## Development Structure

`@aws-amplify/ui-angular` utilizes a monorepo structure to manage devDependencies and the actual packages separately.

This directory (`packages/angular`) contains base dependencies for developing angular packages. The actual code for `@aws-amplify/ui-angular` is located in [`projects/ui-angular`](./projects/ui-angular/) directory.

```bash
packages/angular/
├── projects/ui-angular/ # where the actual `@aws-amplify/ui-angular` library lives
│   ├── src/ # contains src files for UI library code.
│   └── package.json # name: `@aws-amplify/ui-angular`, private: false
│                    # contains dependencies that library needs (e.g. xstate)
│
├── dist/ui-angular/ # this is auto-generated on build. Deployments will only happen from this folder.
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

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn angular dev`

This will start building `@aws-amplify/ui-angular` in watch mode. To test your changes, you can utilize [`examples/angular`](../../examples/angular) to run examples on Angular. Please see examples [README](../../examples/README.md) and e2e [README](../e2e/README.md#contributing) to get started.

### Depenencies

`@aws-amplify/ui-react` depends on [`@aws-amplify/ui`](../ui) for theming, state management, and translation logic. If you're looking for change in these, please refer to `@aws-amplify/ui` [README](../ui/README.md).

## Testing for Production

After you tested your change, you can run `yarn angular build` and `yarn angular-example build` from monorepo to run build for production.

## Troubleshooting

If you're cross developing `angular` and `angular-example`, make sure you're running the same type of commands -- either run `yarn angular dev` and `yarn angular-example dev` together, or run `yarn angular build` and `yarn angular-example build` together. Not doing so will result in IVY compiler conflict.
