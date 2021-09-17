**\***This README is still in progress\*

# Testing E2E with Cypress

### Making new tests

- Make a new `.feature` file in `./features/your/feature/path/`
  - You can follow the example of one of the other existing `.feature` files
- Navigate to `./cypress/integration/your/feature/path/` and create a new folder following the naming convention of the `.feature` you made, and inside that folder, make a `.steps.ts` file with the same name. Then, write your Cypress tests in that file.
- Make sure you have the `examples/next` app running on `localhost:3000`, as Cypress will look to that port to test against
- From this project directory, run `yarn dev` to open Cypress. Then, choose which test to run in the UI.
- Cypress will automatically re-run tests every time you make an edit to the test file.

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

#### Creating an UNVERIFIED user

1. In the Amplify Admin UI, navigate to "User management" and click `Create user`
2. Fill out their credentials according to the alias you need:

   - `username`: `.env.USERNAME`+UNVERIFIED
   - `email`: `.env.USERNAME`+UNVERIFIED@`.env.DOMAIN`
   - `phone`: _not implemented_

3. Fill out a temporary password of your choice and click `Create user`
4. Navigate to your running example and sign in with the alias and temporary password created above
5. Change the test user's password to `.env.VALID_PASSWORD`
