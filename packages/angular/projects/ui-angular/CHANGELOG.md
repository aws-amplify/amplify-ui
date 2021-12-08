# @aws-amplify/ui-angular

## 2.0.4

### Patch Changes

- [#910](https://github.com/aws-amplify/amplify-ui/pull/910) [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0) Thanks [@ErikCH](https://github.com/ErikCH)! - Added text to confirm sign up page, so user knows where code was delivered.

* [#912](https://github.com/aws-amplify/amplify-ui/pull/912) [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76) Thanks [@wlee221](https://github.com/wlee221)! - Fix height jumps between screens and tabs

- [#890](https://github.com/aws-amplify/amplify-ui/pull/890) [`712edfccc`](https://github.com/aws-amplify/amplify-ui/commit/712edfccc77a71542166431ba79b25a31d0dca80) Thanks [@wlee221](https://github.com/wlee221)! - fix(angular): Add first class support for `strict: true`

* [#949](https://github.com/aws-amplify/amplify-ui/pull/949) [`aec9a9479`](https://github.com/aws-amplify/amplify-ui/commit/aec9a9479198240cbe1f535114121e58443f0733) Thanks [@ErikCH](https://github.com/ErikCH)! - Added a way for users to add in custom translations for error messages returned from cognito.

* Updated dependencies [[`72b543ded`](https://github.com/aws-amplify/amplify-ui/commit/72b543ded4c37325a0eb1e4a4803aa88d6d73d5d), [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0), [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76), [`712edfccc`](https://github.com/aws-amplify/amplify-ui/commit/712edfccc77a71542166431ba79b25a31d0dca80), [`f1c2d82db`](https://github.com/aws-amplify/amplify-ui/commit/f1c2d82db913be13425e8b4476983d7cf6f55c40)]:
  - @aws-amplify/ui@3.0.4

## 2.0.3

### Patch Changes

- [#885](https://github.com/aws-amplify/amplify-ui/pull/885) [`8d1783f8e`](https://github.com/aws-amplify/amplify-ui/commit/8d1783f8e84b7531d0a3f427408e3ebc7e83834b) Thanks [@JrPribs](https://github.com/JrPribs)! - Removes BrowserModule as Angular packages shouldn't import it

* [#858](https://github.com/aws-amplify/amplify-ui/pull/858) [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated the password validation logic, so errors are only display on blur, or when six or more characters is typed for both the confirm password and password fields.

* Updated dependencies [[`5d115786c`](https://github.com/aws-amplify/amplify-ui/commit/5d115786c23ce6292842467b4417b26a15f60cb5), [`b21e3e3cb`](https://github.com/aws-amplify/amplify-ui/commit/b21e3e3cb6688238a513f8b125d3be36145dadca), [`4a12ed4f5`](https://github.com/aws-amplify/amplify-ui/commit/4a12ed4f580f852de2558ec3fcf0da152f74dbd5), [`907cd18df`](https://github.com/aws-amplify/amplify-ui/commit/907cd18df6213d432a4b3c5d18c848717e3703e4), [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917)]:
  - @aws-amplify/ui@3.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [[`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f), [`e77e47fe5`](https://github.com/aws-amplify/amplify-ui/commit/e77e47fe5872961bb70d53bfb54f95d5a9d89ef4), [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec), [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046), [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8), [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca), [`c41c6fad1`](https://github.com/aws-amplify/amplify-ui/commit/c41c6fad138269dc72bec682bf7e15341d09ec8a)]:
  - @aws-amplify/ui@3.0.2

## 2.0.1

### Patch Changes

- [#807](https://github.com/aws-amplify/amplify-ui/pull/807) [`de979b521`](https://github.com/aws-amplify/amplify-ui/commit/de979b52131d49b69e6cba930bf3001db8768a3a) Thanks [@ericclemmons](https://github.com/ericclemmons)! - Remove `@angular/*` `peerDependencies` at ^11.2.4

- Updated dependencies [[`9fd90d45b`](https://github.com/aws-amplify/amplify-ui/commit/9fd90d45b01a38ee6d78f0cb67238b210750115c)]:
  - @aws-amplify/ui@3.0.1

## 2.0.0

### Major Changes

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

- [#610](https://github.com/aws-amplify/amplify-ui/pull/610) [`1fc955c4e`](https://github.com/aws-amplify/amplify-ui/commit/1fc955c4e32a2868fa85078befa2f7e2fe95b5a1) Thanks [@wlee221](https://github.com/wlee221)! - Add `sign-up-form-field` slot and component

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

- [#628](https://github.com/aws-amplify/amplify-ui/pull/628) [`ef1e0f000`](https://github.com/aws-amplify/amplify-ui/commit/ef1e0f000346ee553689251e048b6c4b052f6258) Thanks [@wlee221](https://github.com/wlee221)! - Add and expose amplify-checkbox

- [#628](https://github.com/aws-amplify/amplify-ui/pull/628) [`ef1e0f000`](https://github.com/aws-amplify/amplify-ui/commit/ef1e0f000346ee553689251e048b6c4b052f6258) Thanks [@wlee221](https://github.com/wlee221)! - Add `services` prop and custom-sign-up example. See documentation for usage notes.

### Patch Changes

- [#695](https://github.com/aws-amplify/amplify-ui/pull/695) [`d5009572c`](https://github.com/aws-amplify/amplify-ui/commit/d5009572ca4a3bd04114dbda57b9a49f4728468a) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## Header & Footer Slots

  - Add Header slot above the Authenticator
  - Add Footer slot below the Authenticator
  - Add Sign In Header slot above the Sign In form
  - Add Sign In Footer slot below the Sign In form
  - Add Sign Up Header slot above the Sign Up form
  - Add Sign Up Footer slot below the Sign Up form

- Updated dependencies [[`bba3242af`](https://github.com/aws-amplify/amplify-ui/commit/bba3242afba9a54e12b730edbfa1006701a610fc), [`f84e9949b`](https://github.com/aws-amplify/amplify-ui/commit/f84e9949bd98b20fe8d1dff85e30ae69f2356351), [`e76c5ac17`](https://github.com/aws-amplify/amplify-ui/commit/e76c5ac1782561f7b53f19e1fc9e99d2685380d0), [`81169c66e`](https://github.com/aws-amplify/amplify-ui/commit/81169c66ed9591497214860ac95f69504edea1b0), [`3cc1c15d7`](https://github.com/aws-amplify/amplify-ui/commit/3cc1c15d70711823e57c3c495f205f41fb74db27), [`2b2ae8469`](https://github.com/aws-amplify/amplify-ui/commit/2b2ae84695e163309529a02325e70c4416b2a5f6), [`b46597cef`](https://github.com/aws-amplify/amplify-ui/commit/b46597cefb013bfed5345d3ecdfd96649045caca), [`edea9ffaa`](https://github.com/aws-amplify/amplify-ui/commit/edea9ffaa41e2ae051f38e75434b56bb75ed4ff9), [`bd3e09a09`](https://github.com/aws-amplify/amplify-ui/commit/bd3e09a09988af5fa803fa97a25956ea7e9144f7), [`70552a4cc`](https://github.com/aws-amplify/amplify-ui/commit/70552a4cc4d0e532dfaaa22314397690567b444c), [`beb9b49b5`](https://github.com/aws-amplify/amplify-ui/commit/beb9b49b541f39305d595d3e587b6c65c54a3584), [`5257a3109`](https://github.com/aws-amplify/amplify-ui/commit/5257a31092b46a10abda99307779592b63d10890), [`3ead9c629`](https://github.com/aws-amplify/amplify-ui/commit/3ead9c62960c052967376b22922908dbe57bddaa)]:
  - @aws-amplify/ui@3.0.0
