*****This README is still in progress*

# Testing E2E with Cypress

### Making new tests

* Navigate to `./cypress/integration/components/<whatever-component-you-want>`
* Make a new `.feature` file for your test suite
  * You can follow tht example of one of the other existing `.feature` files
* Create a new folder following the naming convention of the `.feature` you made, and inside that folder, make a `.steps.ts` file with the same name. Then, write your Cypress tests in that file.
* Make sure you have the `examples/next` app running on `localhost:3000`, as Cypress will look to that port to test against
* From this project directory, run `yarn dev` to open Cypress. Then, choose which test to run in the UI.
* Cypress will automatically re-run tests every time you make an edit to the test file.