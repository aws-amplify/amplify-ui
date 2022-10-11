**\***This README is still in progress\*

# Testing E2E with Cypress

## Getting Started

To run existing tests on your desired `framework`:

_prerequisite_: You must create populate `packages/e2e/.env` values in order for tests to run successfully against the examples. The values you need to populate are specified in [`packages/e2e/.env.example`](./.env.example). Please see [Creating test users](#creating-test-users) to see our conventions.

1. Navigate to the _root_ of your local clone of [aws-amplify/amplify-ui](https://github.com/aws-amplify/amplify-ui)
1. Run `yarn setup`
1. Run `yarn [framework] dev` (e.g. `yarn react build`)
1. Run `yarn [framework]-example dev` (e.g. `yarn react-example dev`)
1. Run `yarn e2e dev`

## Contributing

### Making new tests

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

### Creating test users

For our e2e tests, we use a specific pattern for test user creation in our various environments. Each test user will have a Cognito status which our tests will depend upon to test certain features. Before creating test users, do the following:

1. Start an instance of an example using the environment in which you'll be creating test users
2. Access the Amplify Admin UI for the environment

#### Creating a CONFIRMED user

1. In the Amplify Admin UI, navigate to "User management" and click `Create user`
2. Fill out their credentials according to the alias you need:

   - `username`: `.env.USERNAME`+CONFIRMED
   - `email`: `.env.USERNAME`+CONFIRMED@`.env.DOMAIN`
   - `phone`: +1`.env.PHONE_NUMBER`

3. Fill out a temporary password of your choice and click `Create user`
4. Find your new user in the users list, click them, select `edit`, and mark all aliases as `Verified`
5. Navigate to your running example and sign in with the alias and temporary password created above
6. Change the test user's password to `.env.VALID_PASSWORD`

#### Creating an UNCONFIRMED user

1. Navigate to your running example and click `Create account`
2. Fill out their credentials according to the alias you need:

   - `username`: `.env.USERNAME`+UNCONFIRMED
   - `email`: `.env.USERNAME`+UNCONFIRMED@`.env.DOMAIN`
   - `phone`: +7`.env.PHONE_NUMBER`

3. Enter their password as `.env.VALID_PASSWORD` and create the user

#### Creating an FORCE_CHANGE_PASSWORD user

1. In the Amplify Admin UI, navigate to "User management" and click `Create user`
2. Fill out their credentials according to the alias you need:

   - `username`: `.env.USERNAME`+FORCE_CHANGE_PASSWORD
   - `email`: `.env.USERNAME`+FORCE_CHANGE_PASSWORD@`.env.DOMAIN`
   - `phone`: +30`.env.PHONE_NUMBER`

3. Fill out a temporary password of your choice and click `Create user`
4. Find your new user in the users list, click them, select `edit`, and mark all aliases as `Verified`

#### Creating an UNVERIFIED user

1. In the Amplify Admin UI, navigate to "User management" and click `Create user`
2. Fill out their credentials according to the alias you need:

   - `username`: `.env.USERNAME`+UNVERIFIED
   - `email`: `.env.USERNAME`+UNVERIFIED@`.env.DOMAIN`
   - `phone`: _not implemented_

3. Fill out a temporary password of your choice and click `Create user`
4. Navigate to your running example and sign in with the alias and temporary password created above
5. Change the test user's password to `.env.VALID_PASSWORD`
