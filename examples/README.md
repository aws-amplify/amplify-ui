# Examples

This directory contains example apps for each framework we support.

## Examples Development

1. Create or Update an example at [`examples/{next,vue,angular}/...`](examples)

   For your `aws-exports.js`, you can [reference an existing or create a new environment](../environments/README.md).

1. Run your example at monorep root: `yarn {react,vue,angular}-example dev`
1. Visit your example (e.g. <http://localhost:3000/ui/components/authenticator/sign-up-with-username>)
1. Make changes to [`@aws-amplify/ui-{react,vue,angular}`](packages) & save.

   Examples should automatically hot-reload your changes in the example.
