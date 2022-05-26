# Contributing

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn vue dev`

This will start building `@aws-amplify/ui-vue` in watch mode. To test your changes, you can utilize [`examples/vue`](../../examples/next) to run examples on `vite`. Please see examples [README](../../examples/README.md) and e2e [README](../e2e/README.md#contributing) to get started.

## Depenencies

`@aws-amplify/ui-vue` depends on [`@aws-amplify/ui`](../ui) for theming, state management, and translation logic. If you're looking for for change in these, please refer to `@aws-amplify/ui` [README](../ui/README.md).

## Testing for Production

After you tested your change, you can run `yarn vue build` from monorepo to run build for production.
