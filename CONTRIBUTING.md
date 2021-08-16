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

## Next/React Development

1. Create or Update an example at [`examples/...`](examples)

   For your `aws-exports.js`, you can [reference an existing or create a new environment](environments).

   ```js
   // examples/next/pages/components/authenticator/sign-up.tsx
   import { Authenticator } from '@aws-amplify/ui-react';
   import { Amplify } from 'aws-amplify';
   import awsExports from '../../../../../environments/auth-with-username-no-attributes/src/aws-exports';

   Amplify.configure(awsExports);

   export default function AuthenticatorWithUsername() {
     return <Authenticator />;
   }
   ```

1. Visit your example (e.g. <http://localhost:3000/components/authenticator/sign-up>)
1. Make changes to [`@aws-amplify/ui-react`](packages/react) & save.

   Next.js should automatically hot-reload your changes in the example.

### Documentation & Testing

1. Create or Update a `${feature}.feature` file (using [Gherkin](https://cucumber.io/docs/gherkin/reference/)) describing the behavior in [`packages/e2e/cypress/integration/${slug}`](packages/e2e/cypress/integration).

   ```gherkin
   Feature: My new feature

     Documentation-friendly description of this feature, why it exists, & how to use it.

     @react
     Scenario: Example scenario using this feature
       Given some "STARTING_POINT"
       When I DO "SOMETHING"
       And I DO SOMETHING "ELSE"
       Then I see "THE DESIRED BEHAVIOR"
   ```

1. Create or Update the accompanying `${slug}.feature` tests (e.g. `packages/e2e/cypress/integration/${slug}/${feature}/${feature}.ts`
1. Run `yarn e2e dev` to load Cypress
1. Click on your updated `${feature}.feature` file to validate your changes
1. Add tags (e.g. `@react`, `@vue`, `@angular`, `@skip`, or `@focus`) above your `Scenario` to indicate which platform(s) to test against

#### Vue Development

1. `yarn dev:vue`
1. Visit <http://localhost:3001/>

#### Angular Development

1. `yarn build:angular`, or `yarn build:angular:watch` for live development
1. `yarn dev:angular`.
1. Visit <http://localhost:4200/>

#### Flutter Development

1. see [packages/flutter/README.md](packages/flutter/README.md)
