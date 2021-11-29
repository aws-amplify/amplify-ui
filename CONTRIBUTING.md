# Contributing

## Getting Started

1. Fork & Clone this repo
1. [`nvm install`](https://github.com/nvm-sh/nvm)
1. [`nvm use`](https://github.com/nvm-sh/nvm)
1. `yarn install`

## Documentation Development

1. Run the documentation via `yarn docs dev`
1. Visit <http://localhost:5000/>
1. Create/Update content based on the URL.

   For example, the content for
   http://localhost:5000/components/authenticator is located at [`docs/src/pages/components/authenticator/index.mdx`](docs/src/pages/components/authenticator/index.mdx)

Internally, this content is served by a single, Next.js [optional catch all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes):
[`docs/src/pages/[[...slugs]].tsx`](docs/src/pages/[[...slugs]].tsx).

## `@aws-amplify/ui`

- `yarn ui build` to rebuild for production.
- `yarn ui dev` to watch & rebuild for development.

## `@aws-amplify/ui-react`

- `yarn react build` to rebuild for production.
- `yarn react dev` to watch & rebuild for development.
- `yarn next-example dev` to run React examples on Next.js.

## `@aws-amplify/ui-vue`

- `yarn vue build` to rebuild for production
- `yarn vue dev` to watch & rebuild for development.
- `yarn vue-example dev` to run Vue examples on Vite.

## `@aws-amplify/ui-angular`

- `yarn angular build` to rebuild for production
- `yarn angular dev` to watch & rebuild for development
- `yarn angular-example dev` to run Angular examples.

### Angular Troubleshooting

Whenever `yarn angular build` is run, such as part of postinstall script, you want to run `yarn angular dev` again. This is to ensure that both `yarn angular` and `yarn angular-example` have [ivy](https://angular.io/guide/ivy) enabled for local development.

## Examples Development

1. Create or Update an example at [`examples/{next,vue,angular}/...`](examples)

   For your `aws-exports.js`, you can [reference an existing or create a new environment](environments).

   ```js
   // examples/next/pages/components/authenticator/sign-up-with-username.tsx
   import { Authenticator } from '@aws-amplify/ui-react';
   import { Amplify } from 'aws-amplify';
   import awsExports from '../../../../../environments/auth-with-username-no-attributes/src/aws-exports';

   Amplify.configure(awsExports);

   export default function AuthenticatorWithUsername() {
     return <Authenticator />;
   }
   ```

1. Run your example: `yarn {next,vue,angular}-example dev`
1. Visit your example (e.g. <http://localhost:3000/ui/components/authenticator/sign-up-with-username>)
1. Make changes to [`@aws-amplify/ui-{react,vue,angular}`](packages) & save.

   Examples should automatically hot-reload your changes in the example.

### E2E Testing

1. Create or Update a `${feature}.feature` file (using [Gherkin](https://cucumber.io/docs/gherkin/reference/)) describing the behavior in [`packages/e2e/features/${slug}`](packages/e2e/features).

   ```gherkin
   Feature: My new feature

     Documentation-friendly description of this feature, why it exists, & how to use it.

     @angular @react @vue
     Scenario: Example scenario using this feature
       Given some "STARTING_POINT"
       When I DO "SOMETHING"
       And I DO SOMETHING "ELSE"
       Then I see "THE DESIRED BEHAVIOR"

     @react @skip
     Scenario: Some React-specific scenario that can't be rain in CI

     @angular @todo-react @todo-vue
     Scenario: Some scenario supported in Angular, but React & Vue haven't added yet
   ```

1. Create or Update the accompanying `${slug}.feature` tests (e.g. `packages/e2e/cypress/integration/${slug}/${feature}/${feature}.steps.ts`
1. Start one of the [examples](examples).
1. Run `yarn e2e dev` to load Cypress

   ```shell
   TAGS='@react and not (@skip or @todo-react)' yarn e2e dev
   ```

1. Click on your updated `${feature}.feature` file to validate your changes
1. Add tags above your `Scenario` to indicate how this feature should be tested:

   - If the library supports it, then add one of the following:

     - `@angular` for `@aws-amplify/ui-angular`
     - `@react` for `@aws-amplify/ui-react`
     - `@vue` for `@aws-amplify/ui-vue`

     This will ensure automated documentation marks these as supported features.

   - If the library supports it, **but tests cannot be ran in CI for technical reasons**, then also add:

     - `@skip` for all libraries
     - `@skip-angular` for specifically `@aws-amplify/ui-angular`
     - `@skip-react` for specifically `@aws-amplify/ui-react`
     - `@skip-vue` for specifically `@aws-amplify/ui-vue`

     This will ensure automated documentation marks these as supported features, but won't block builds (in PRs or `main`) with test failures.

   - If the library _should_ support it, then also add:

     - `@todo-angular` for `@aws-amplify/ui-angular`
     - `@todo-react` for `@aws-amplify/ui-react`
     - `@todo-vue` for `@aws-amplify/ui-vue`

     This will ensure automated documentation marks these as _upcoming_ features, will skip these on PRs, but **will error on `main` until completed**.

## Updating Icons

If material design icon svg files are updated [upstream](https://github.com/google/material-design-icons/), follow these steps to update our icons components for all frameworks:

1. Copy [material-design-icons repo](https://github.com/google/material-design-icons/) svg icons to `material-design-icons` folder (TODO: create script for this step)
1. Update components for all frameworks by runing the following command at root:

```
yarn build:icons
```

1. Review and commit changes to icons
1. Submit PR for review

## Bug Reports

Bug reports and feature requests are always welcome. Good bug reports are extremely helpful, so thanks in advance!

When filing a bug, please try to be as detailed as possible. In addition to the bug report form information, details like these are incredibly useful:

- A reproducible test case or series of steps
- The date/commit/version(s) of the code you're running
- Any modifications you've made relevant to the bug
- Anything unusual about your environment or deployment

Guidelines for bug reports:

- Check to see if a [duplicate or closed issue](https://github.com/aws-amplify/amplify-ui/issues?q=is%3Aissue+) already exists!
- Provide a short and descriptive issue title
- Remove any sensitive data from your examples or snippets
- Format any code snippets using [Markdown](https://docs.github.com/en/github/writing-on-github/creating-and-highlighting-code-blocks) syntax

Finally, thank you for taking the time to read this, and taking the time to write a good bug report.


