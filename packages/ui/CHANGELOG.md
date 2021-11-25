# @aws-amplify/ui

## 3.0.2

### Patch Changes

- [#866](https://github.com/aws-amplify/amplify-ui/pull/866) [`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Making size prop on slider field work like other fields and adding disabled styling.

* [#844](https://github.com/aws-amplify/amplify-ui/pull/844) [`e77e47fe5`](https://github.com/aws-amplify/amplify-ui/commit/e77e47fe5872961bb70d53bfb54f95d5a9d89ef4) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing default SwitchField styles so the background color shows up.

- [#850](https://github.com/aws-amplify/amplify-ui/pull/850) [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating radio styles to be consistent with checkbox field.

* [#854](https://github.com/aws-amplify/amplify-ui/pull/854) [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating quiet variation of stepper field

- [#842](https://github.com/aws-amplify/amplify-ui/pull/842) [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8) Thanks [@zchenwei](https://github.com/zchenwei)! - ForwardRef support for Alert, ButtonGroup, Expander & ExpanderItem

* [#878](https://github.com/aws-amplify/amplify-ui/pull/878) [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating text colors for better contrast

- [#819](https://github.com/aws-amplify/amplify-ui/pull/819) [`c41c6fad1`](https://github.com/aws-amplify/amplify-ui/commit/c41c6fad138269dc72bec682bf7e15341d09ec8a) Thanks [@strugman](https://github.com/strugman)! - Fixed 'RESET_PASSWORD' translation

## 3.0.1

### Patch Changes

- [#829](https://github.com/aws-amplify/amplify-ui/pull/829) [`9fd90d45b`](https://github.com/aws-amplify/amplify-ui/commit/9fd90d45b01a38ee6d78f0cb67238b210750115c) Thanks [@wlee221](https://github.com/wlee221)! - Fix redirect from signIn to confirmSignUp

## 3.0.0

### Major Changes

- [#747](https://github.com/aws-amplify/amplify-ui/pull/747) [`81169c66e`](https://github.com/aws-amplify/amplify-ui/commit/81169c66ed9591497214860ac95f69504edea1b0) Thanks [@wlee221](https://github.com/wlee221)! - New primitive components and theming API

  Amplify UI is building primitive components like badges, cards, alerts, etc. These primitive components will first be available on React with the goal of adding support for more frameworks in the future. We hope these primitives will empower developers to build applications faster. We plan on building out more connected components like the Authenticator and we need primitive components like buttons and inputs to be shared across them. Exposing these primitive components allows developers to create and theme applications end-to-end using the same components everywhere.

  _See: [RFC: Amplify UI Primitive Components](https://github.com/aws-amplify/amplify-ui/discussions/198)_

  ## Goals

  **Flexible** – Primitives can be integrated into as many applications as possible.
  **Customizable** – Primitives can be composed and styled using a theme, CSS, a CSS-in-JS framework, or un-styled.
  **Accessible** – Primitives follow WCAG and WAI-ARIA guidelines to make building accessible applications easy.
  Basic

  ## Implementation

  - Added 37 new React primitive components such as Button, TextField, Alert that are the building blocks to create consistency across connected components.
  - Added Theming API to allow global and component-override theming. Theme structure uses design tokens including borderWidth, colors, fonts, fontSizes, fontWeights, LineHeights, opacities and breakpoints.
  - Documentation: https://ui.docs.amplify.aws/components

- [#745](https://github.com/aws-amplify/amplify-ui/pull/745) [`3ead9c629`](https://github.com/aws-amplify/amplify-ui/commit/3ead9c62960c052967376b22922908dbe57bddaa) Thanks [@wlee221](https://github.com/wlee221)! - Zero-Configuration Authenticator for Angular, React, & Vue

  The `Authenticator` has been updated based on customer feedback & real-world use-cases to deliver an improved out-of-the-box experience & greater customization.

  _See: [RFC: Authenticator@next](https://github.com/aws-amplify/amplify-ui/discussions/200)_

  ## Goals

  - **Zero-config** – The Authenticator automatically infers Amplify CLI & Admin UI settings to work out-of-the-box.

    Run `amplify pull` with the latest CLI whenever your backend changes, and the Authenticator automatically reflects the correct login mechanism, social providers, & more.

  - **Native** – The Authenticator is implemented in its respective framework (e.g. Angular, React, Vue) for consistency & familiarity.

  - **Stable** – Existing & upcoming Authenticator behavior is captured & tested to reduce & prevent regressions.

    [Authenticator behavior](https://github.com/aws-amplify/amplify-ui/tree/main/packages/e2e/features/ui/components/authenticator) is tested as [E2E tests](https://github.com/aws-amplify/amplify-ui/blob/main/CONTRIBUTING.md#e2e-testing) on every PR.

  - **Interoperable** – Work with password managers, autofill, existing styles, & other common features.

  - **Customizable** – More ways to customize the UI & behavior without losing the benefits of the Authenticator.

    Customers have access to the same functionality that the `Authenticator` uses internally to even build a 100% custom Authenticator, without sacrificing any of the logic.

  - **Reproducible** – Authentication is complex. The Authenticator is is developed & tested against a myriad of Amplify backends, example apps, and specifications.

    Check out our [environments](https://github.com/aws-amplify/amplify-ui/tree/main/environments) and [examples](https://github.com/aws-amplify/amplify-ui/tree/main/examples) for more.

  ***

  Learn more by visiting the [Authenticator Documentation](https://ui.docs.amplify.aws/components/authenticator).

### Minor Changes

- [#626](https://github.com/aws-amplify/amplify-ui/pull/626) [`f84e9949b`](https://github.com/aws-amplify/amplify-ui/commit/f84e9949bd98b20fe8d1dff85e30ae69f2356351) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## Zero Configuration

  As of `@aws-amplify/cli@6.5.0`, `aws-exports.js` includes your backend configuration for the Authenticator to automatically infer `loginMechanisms` and `socialProviders`.

  ### Before (React)

  ```js
  export default withAuthenticator(App, {
    loginMechanisms: ['email'],
    socialProviders: ['amazon', 'apple', 'facebook', 'google'],
  });
  ```

  ### After (React)

  ```js
  export default withAuthenticator(App);
  ```

  ## Sign in with Apple

  The Authenticator supports `apple` as one of many `socialProviders`. See: https://docs.amplify.aws/lib/auth/social/q/platform/js/

- [#650](https://github.com/aws-amplify/amplify-ui/pull/650) [`e76c5ac17`](https://github.com/aws-amplify/amplify-ui/commit/e76c5ac1782561f7b53f19e1fc9e99d2685380d0) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## `signUpAttributes`

  The Sign Up form will include most of https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html by default with zero-config.

  Any verification mechanisms (e.g. `email`, `phone_number`) will always be required.

- [#717](https://github.com/aws-amplify/amplify-ui/pull/717) [`edea9ffaa`](https://github.com/aws-amplify/amplify-ui/commit/edea9ffaa41e2ae051f38e75434b56bb75ed4ff9) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding card variations

  ```jsx
  <Card>
    Default card
  </Card>

  <Card variation="outlined">
    Outlined card
  </Card>

  <Card variation="elevated">
    Elevated card
  </Card>
  ```

- [#627](https://github.com/aws-amplify/amplify-ui/pull/627) [`bd3e09a09`](https://github.com/aws-amplify/amplify-ui/commit/bd3e09a09988af5fa803fa97a25956ea7e9144f7) Thanks [@wlee221](https://github.com/wlee221)! - This implements `AuthenticatorService` that can be used internally and externally to access common Authenticator context and helpers.

  _Usage_:

  _app.component.ts_

  ```ts
  export class AppComponent {
    constructor(public authenticator: AuthenticatorService) {}
  }
  ```

  _app.component.html_

  ```html
  <!-- example of "reset password" button -->
  <button (click)="authenticator.toResetPassword()">Reset password</button>

  <!-- example of "sign up" submit button -->
  <button (click)="authenticator.submitForm()">Sign Up</button>

  <!-- disabling the submit button if submission is in progress -->
  <button
    (click)="authenticator.submitForm()"
    [disabled]="authenticator.isPending"
  >
    Sign Up
  </button>
  ```

- [#653](https://github.com/aws-amplify/amplify-ui/pull/653) [`70552a4cc`](https://github.com/aws-amplify/amplify-ui/commit/70552a4cc4d0e532dfaaa22314397690567b444c) Thanks [@reesscot](https://github.com/reesscot)! - Icon size now matches parent font-size. Allows customers to more easily use icons alongsize Headings, Buttons, etc.

  Example:

  ```
  <Button gap="0.1rem" size="small">
      <IconSave /> Save
  </Button>
  ```

### Patch Changes

- [#552](https://github.com/aws-amplify/amplify-ui/pull/552) [`bba3242af`](https://github.com/aws-amplify/amplify-ui/commit/bba3242afba9a54e12b730edbfa1006701a610fc) Thanks [@ericclemmons](https://github.com/ericclemmons)! - `@aws-amplify/ui-react` supports validation & re-use & customization of `Authenticator.SignUp.FormFields` via `components` & `services`:

  ```js
  <Authenticator
    components={{
      SignUp: {
        FormFields() {
          const { validationErrors } = useAuthenticator();
          return (
            <>
              <TextField
                label="Preferred Username"
                labelHidden={true}
                name="preferred_username"
                placeholder="Preferred Username"
              />
              <Authenticator.SignUp.FormFields />
              <CheckboxField
                errorMessage={validationErrors.acknowledgement}
                hasError={!!validationErrors.acknowledgement}
                label="I agree with the Terms & Conditions"
                name="acknowledgement"
                value="yes"
              />
            </>
          );
        },
      },
    }}
    services={{
      async validateCustomSignUp(formData) {
        if (!formData.acknowledgement) {
          return {
            acknowledgement: 'You must agree to the Terms & Conditions',
          };
        }
      },
    }}
  />
  ```

- [#709](https://github.com/aws-amplify/amplify-ui/pull/709) [`3cc1c15d7`](https://github.com/aws-amplify/amplify-ui/commit/3cc1c15d70711823e57c3c495f205f41fb74db27) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Building icons from Figma source now.

- [#727](https://github.com/aws-amplify/amplify-ui/pull/727) [`2b2ae8469`](https://github.com/aws-amplify/amplify-ui/commit/2b2ae84695e163309529a02325e70c4416b2a5f6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - \* Divider component has more theming options for the border style, color, and width.

  - Fixing vertical divider
  - Improving Divider docs

- [#615](https://github.com/aws-amplify/amplify-ui/pull/615) [`b46597cef`](https://github.com/aws-amplify/amplify-ui/commit/b46597cefb013bfed5345d3ecdfd96649045caca) Thanks [@reesscot](https://github.com/reesscot)! - Apply `box-sizing: border-box` styling to all Amplify theme children

- [#612](https://github.com/aws-amplify/amplify-ui/pull/612) [`beb9b49b5`](https://github.com/aws-amplify/amplify-ui/commit/beb9b49b541f39305d595d3e587b6c65c54a3584) Thanks [@reesscot](https://github.com/reesscot)! - Menu primitive

  New primitive which enables customers to create aaccessible, interactive menu for selecting actions within an application.
  Dropdown menu is collision-aware and will automatically change location based on available space.

  ```jsx
  import { Divider, Menu, MenuItem } from '@aws-amplify/ui-react';

  export const BasicExample = () => {
    return (
      <Menu>
        <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
        <MenuItem onClick={() => alert('Create a Copy')}>
          Create a Copy
        </MenuItem>
        <MenuItem onClick={() => alert('Mark as Draft')}>
          Mark as Draft
        </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
          Delete
        </MenuItem>
        <MenuItem onClick={() => alert('Attend a workshop')}>
          Attend a workshop
        </MenuItem>
      </Menu>
    );
  };
  ```

- [#634](https://github.com/aws-amplify/amplify-ui/pull/634) [`5257a3109`](https://github.com/aws-amplify/amplify-ui/commit/5257a31092b46a10abda99307779592b63d10890) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding support for token style props in React components and moving `createTheme` inside the AmplifyProvider so users don't have to call it directly in React.

  ```jsx
  const theme: Theme = {
    name: 'my-theme',
    tokens: {
      //...
    },
  };

  const App = () => {
    return <AmplifyProvider theme={theme}></AmplifyProvider>;
  };
  ```

  Then using theme tokens in a style prop:

  ```jsx
  import { useTheme, Text } from '@aws-amplify/ui-react';

  const MyComponent = () => {
    const { tokens } = useTheme();
    return <Text color={tokens.colors.font.error}>Error!</Text>;
  };
  ```

  The ui-react package is now exporting the `Theme` type to make it easier to define a theme object outside of the `createTheme` method.
