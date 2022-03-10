# Contributing

## Getting Started

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn react dev`

This will start building `@aws-amplify/ui-react` in watch mode. To test your changes, you can utilize [`examples/next`](../../examples/next) to run examples on `next.js`. Please see examples [README](../../examples/README.md) and e2e [README](../e2e/README.md#contributing) to get started.

## Depenencies

`@aws-amplify/ui-react` depends on [`@aws-amplify/ui`](../ui) for theming, state management, and translation logic. If you're looking for change in these, please refer to `@aws-amplify/ui` [README](../ui/README.md).

## Testing for Production

After you tested your change, you can run `yarn react build` from monorepo to run build for production.
