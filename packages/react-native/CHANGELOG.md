# @aws-amplify/ui-react-native

## 2.0.7

### Patch Changes

- Updated dependencies [[`4f643b05b`](https://github.com/aws-amplify/amplify-ui/commit/4f643b05b010901226bf200f8d0b06601d0ecab5), [`190bf28d1`](https://github.com/aws-amplify/amplify-ui/commit/190bf28d1b570329f415d2d4c03e608a3b30412b)]:
  - @aws-amplify/ui-react-core@3.0.6
  - @aws-amplify/ui@6.0.6
  - @aws-amplify/ui-react-core-notifications@2.0.6

## 2.0.6

### Patch Changes

- Updated dependencies [[`38bae5ee5`](https://github.com/aws-amplify/amplify-ui/commit/38bae5ee522bf572cc065953b2a94710e6913cc2)]:
  - @aws-amplify/ui@6.0.5
  - @aws-amplify/ui-react-core@3.0.5
  - @aws-amplify/ui-react-core-notifications@2.0.5

## 2.0.5

### Patch Changes

- Updated dependencies [[`c526cf53b`](https://github.com/aws-amplify/amplify-ui/commit/c526cf53bc07bb85c0789aa5edfdfcb4485fa5f5), [`cc2740b9a`](https://github.com/aws-amplify/amplify-ui/commit/cc2740b9a033e587715a37c379166388b267ff4e)]:
  - @aws-amplify/ui@6.0.4
  - @aws-amplify/ui-react-core@3.0.4
  - @aws-amplify/ui-react-core-notifications@2.0.4

## 2.0.4

### Patch Changes

- Updated dependencies [[`ed55a6a36`](https://github.com/aws-amplify/amplify-ui/commit/ed55a6a36b9250db50e3edaf31b53ce4fc35edfe), [`272a05edc`](https://github.com/aws-amplify/amplify-ui/commit/272a05edcafa8f9e0e53ed1eb66f566f308d09b3)]:
  - @aws-amplify/ui@6.0.3
  - @aws-amplify/ui-react-core@3.0.3
  - @aws-amplify/ui-react-core-notifications@2.0.3

## 2.0.3

### Patch Changes

- [#4767](https://github.com/aws-amplify/amplify-ui/pull/4767) [`4ff26e27e`](https://github.com/aws-amplify/amplify-ui/commit/4ff26e27e4bc8909cc2b86c738eca5085b2a42d1) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): forgot password clean up

- Updated dependencies [[`4ff26e27e`](https://github.com/aws-amplify/amplify-ui/commit/4ff26e27e4bc8909cc2b86c738eca5085b2a42d1), [`bb141a719`](https://github.com/aws-amplify/amplify-ui/commit/bb141a719fd9bc2d7680e539f2ff047deb88ee7e)]:
  - @aws-amplify/ui@6.0.2
  - @aws-amplify/ui-react-core@3.0.2
  - @aws-amplify/ui-react-core-notifications@2.0.2

## 2.0.2

### Patch Changes

- Updated dependencies [[`9dd0e58e5`](https://github.com/aws-amplify/amplify-ui/commit/9dd0e58e5167d307c2154b3280de3c0e52f607e1)]:
  - @aws-amplify/ui@6.0.1
  - @aws-amplify/ui-react-core@3.0.1
  - @aws-amplify/ui-react-core-notifications@2.0.1

## 2.0.1

### Patch Changes

- [#4730](https://github.com/aws-amplify/amplify-ui/pull/4730) [`2ab62defe`](https://github.com/aws-amplify/amplify-ui/commit/2ab62defe14da3dce3bc960aeae47b2342e36da1) Thanks [@calebpollman](https://github.com/calebpollman)! - fix: rename ResetPassword to ForgotPassword

## 2.0.0

### Major Changes

- `Authenticator` Breaking Changes

The `initialState` property now accepts `forgotPassword` in place of `resetPassword`:

```diff
- <Authenticator initialState="resetPassword" />
+ <Authenticator initialState="forgotPassword" />
```

---

The `user` object provided after an end user has been authenticated has been updated to reflect the `AuthUser` interface available from `aws-amplify/auth`:

```diff
- interface AmplifyUser {
-   challengeName?: ChallengeName;
-   attributes?: CognitpAttributes;
-   username: string;
- }
+ interface AuthUser  {
+   username: string;
+   userId: string;
+   signInDetails?: CognitoAuthSignInDetails;
+ }
```

`AuthUser` can be imported from `aws-amplify/auth`:

```ts
import { AuthUser } from 'aws-amplify/auth';
```

User attributes are now available by directly calling `fetchUserAttribues`:

```ts
import { fetchUserAttributes } from 'aws-amplify/auth';
```

---

The function signatures of the `services` interface have been updated to align with the shape of the underlying `aws-amplify/auth` APIs used by the `Authenticator` and provide improved typescript support:

```diff
interface AuthenticatorProps {
  services?: {
-    getCurrentUser: () => Promise<any>,
+    getCurrentUser: () => Promise<AuthUser>,

-    handleSignIn: ({ username, password, }: { username: string;password: string; }) => Promise<any>,
+    handleSignIn: (input: SignInInput) => Promise<SignInOutput>,

-    handleSignUp: (formData: any) => Promise<ISignUpResult>,
+    handleSignUp: (input: SignUpInput) => Promise<SignUpOutput>,

-    handleConfirmSignIn: ({ user, code, mfaType, }: { user: any; code: string; mfaType: ChallengeName; }) =>Promise<any>),
+    handleConfirmSignIn: (input: ConfirmSignInInput) => Promise<ConfirmSignInOutput>,

-    handleConfirmSignUp: ({ username, code, }: { username: string; code: string; }) => Promise<any>,
+    handleConfirmSignUp: (input: ConfirmSignUpInput) => Promise<ConfirmSignUpOutput>,

-    handleForgotPasswordSubmit: ({ username, code, password, }: { username: string; code: string; password:string; }) => Promise<string>),
+    handleForgotPasswordSubmit: (input: ConfirmResetPasswordInput) => Promise<void>,

-    handleForgotPassword: (formData: any) => Promise<any>,
+    handleForgotPassword: (input: ResetPasswordInput) => Promise<ResetPasswordOutput>,
  }
}
```

The input and return type interfaces are available as imports from `aws-amplify/auth`:

```ts
import { ConfirmSignInInput } from 'aws-amplify';
```

- Major version bump for all Amplify UI packages due to uprade of peerDependency aws-amplify to v6

### Minor Changes

- [#4445](https://github.com/aws-amplify/amplify-ui/pull/4445) [`7b55f4f78`](https://github.com/aws-amplify/amplify-ui/commit/7b55f4f781c3adab19c3d91ef9f293647566ecd9) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat: allow themes to have arbitrary tokens

### Patch Changes

- [#4719](https://github.com/aws-amplify/amplify-ui/pull/4719) [`f9e4fa838`](https://github.com/aws-amplify/amplify-ui/commit/f9e4fa8388a1994996a132f50261f431d1a52e43) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(rna): refactor fed sign in

- [#4712](https://github.com/aws-amplify/amplify-ui/pull/4712) [`02d2cde68`](https://github.com/aws-amplify/amplify-ui/commit/02d2cde686929bce7965c3b547173f0a03b87aaa) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(rna): prefer route over authStatus for rendering children

- [#4716](https://github.com/aws-amplify/amplify-ui/pull/4716) [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): upgrade aws-amplify deps

- Updated dependencies [[`55d1f4940`](https://github.com/aws-amplify/amplify-ui/commit/55d1f49401359bb0b75756742658b173edc0fb72), [`7b55f4f78`](https://github.com/aws-amplify/amplify-ui/commit/7b55f4f781c3adab19c3d91ef9f293647566ecd9), [`27783d65a`](https://github.com/aws-amplify/amplify-ui/commit/27783d65a06e712bb3ca8c116798a52db3d4a3a4), [`59c042c17`](https://github.com/aws-amplify/amplify-ui/commit/59c042c170358c6cc2ca09d13ffcc7e517586ef2), [`91372387c`](https://github.com/aws-amplify/amplify-ui/commit/91372387c29f5d68526070e4c3b8a13bbf079e5c), [`f9e4fa838`](https://github.com/aws-amplify/amplify-ui/commit/f9e4fa8388a1994996a132f50261f431d1a52e43), [`27be6ccf5`](https://github.com/aws-amplify/amplify-ui/commit/27be6ccf51ce093d3589f9f36b4530e6825a317b), [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795)]:
  - @aws-amplify/ui@6.0.0
  - @aws-amplify/ui-react-core@3.0.0
  - @aws-amplify/ui-react-core-notifications@2.0.0

## 1.2.28

### Patch Changes

- Updated dependencies [[`d570694c7`](https://github.com/aws-amplify/amplify-ui/commit/d570694c7e0d9d112449d3aade2d567773555926), [`6a5a4d79c`](https://github.com/aws-amplify/amplify-ui/commit/6a5a4d79ce60124fba2dc00d86b9e1a9b5f21c39)]:
  - @aws-amplify/ui@5.8.1
  - @aws-amplify/ui-react-core@2.1.33
  - @aws-amplify/ui-react-core-notifications@1.0.10

## 1.2.27

### Patch Changes

- [#4368](https://github.com/aws-amplify/amplify-ui/pull/4368) [`14e402b6e`](https://github.com/aws-amplify/amplify-ui/commit/14e402b6eedab6bdef5cec21b0b084f230b0ce26) Thanks [@hbuchel](https://github.com/hbuchel)! - chore(ui): adds info, warning, and success border tokens. updates background color tokens for info, warning, success and error.

- Updated dependencies [[`276968530`](https://github.com/aws-amplify/amplify-ui/commit/276968530ba1049cfa4a9fd1efe8bd870b3e4b18), [`ec495a6f6`](https://github.com/aws-amplify/amplify-ui/commit/ec495a6f638c53970edd8706a0eeb5f95d142689), [`e1fc61119`](https://github.com/aws-amplify/amplify-ui/commit/e1fc61119224a92a4648d1d1673177647b1a8e53), [`14e402b6e`](https://github.com/aws-amplify/amplify-ui/commit/14e402b6eedab6bdef5cec21b0b084f230b0ce26), [`2407ac294`](https://github.com/aws-amplify/amplify-ui/commit/2407ac294270214bd20c414349d2423ab14b8066), [`5bc0c8a32`](https://github.com/aws-amplify/amplify-ui/commit/5bc0c8a32d1552313df496f96b96738637d0b157), [`64fba0fd2`](https://github.com/aws-amplify/amplify-ui/commit/64fba0fd2ec4a0c5061b461f527c8a45235eee13)]:
  - @aws-amplify/ui@5.8.0
  - @aws-amplify/ui-react-core@2.1.32
  - @aws-amplify/ui-react-core-notifications@1.0.9

## 1.2.26

### Patch Changes

- Updated dependencies [[`5cc76794a`](https://github.com/aws-amplify/amplify-ui/commit/5cc76794a71584e26b1ec699c1dc1713d8a986c9)]:
  - @aws-amplify/ui@5.7.2
  - @aws-amplify/ui-react-core@2.1.31
  - @aws-amplify/ui-react-core-notifications@1.0.8

## 1.2.25

### Patch Changes

- [#4305](https://github.com/aws-amplify/amplify-ui/pull/4305) [`00c7abc25`](https://github.com/aws-amplify/amplify-ui/commit/00c7abc25b263bb42b67d8980b31212d0a206d1c) Thanks [@hbuchel](https://github.com/hbuchel)! - feat(react): Add `colorTheme` prop to Button

  The Button React primitive now accepts the `colorTheme` prop which allows for more color variants. Usage:

  ```
  <Button colorTheme="error">Button text</Button>
  ```

- [#4349](https://github.com/aws-amplify/amplify-ui/pull/4349) [`8c2a3aad8`](https://github.com/aws-amplify/amplify-ui/commit/8c2a3aad88453ecd0f3e1fad0678906a89e56a87) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - fix(ui-react-native): Fix RN Authenticator not trimming values before validation.

- Updated dependencies [[`00c7abc25`](https://github.com/aws-amplify/amplify-ui/commit/00c7abc25b263bb42b67d8980b31212d0a206d1c), [`54d884dd0`](https://github.com/aws-amplify/amplify-ui/commit/54d884dd0ae7f16cc1f5b71ae767e0ccf477c4b5), [`5040faf51`](https://github.com/aws-amplify/amplify-ui/commit/5040faf51ce2dc87882d452e6f90ad4ab0bd6967)]:
  - @aws-amplify/ui@5.7.1
  - @aws-amplify/ui-react-core@2.1.30
  - @aws-amplify/ui-react-core-notifications@1.0.7

## 1.2.24

### Patch Changes

- [#4321](https://github.com/aws-amplify/amplify-ui/pull/4321) [`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441) Thanks [@thaddmt](https://github.com/thaddmt)! - chore: set amplify dependencies to be ^ instead of >=

- Updated dependencies [[`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441), [`30624bd4f`](https://github.com/aws-amplify/amplify-ui/commit/30624bd4f165ed07a1cc94071a2d5550510b07b7)]:
  - @aws-amplify/ui-react-core-notifications@1.0.6
  - @aws-amplify/ui-react-core@2.1.29
  - @aws-amplify/ui@5.7.0

## 1.2.23

### Patch Changes

- [#4303](https://github.com/aws-amplify/amplify-ui/pull/4303) [`81d06820c`](https://github.com/aws-amplify/amplify-ui/commit/81d06820c33d44e956d01e25b0886ba2a0c5c0c2) Thanks [@calebpollman](https://github.com/calebpollman)! - package.json updates: fix module field, add commonjs output, use react-native field

- Updated dependencies [[`e7e75874d`](https://github.com/aws-amplify/amplify-ui/commit/e7e75874dea238046c94e4fdd965029620171254), [`0417bd41c`](https://github.com/aws-amplify/amplify-ui/commit/0417bd41c065673eb70dd916c9008d88671445c9)]:
  - @aws-amplify/ui@5.6.9
  - @aws-amplify/ui-react-core@2.1.28
  - @aws-amplify/ui-react-core-notifications@1.0.5

## 1.2.22

### Patch Changes

- [#4276](https://github.com/aws-amplify/amplify-ui/pull/4276) [`9a491c767`](https://github.com/aws-amplify/amplify-ui/commit/9a491c767f2b440d75b8e4b3ddf53711d0fa5e8b) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(react-native): small tweaks to authenticator styling to space out text fields a bit

- Updated dependencies [[`6b71ec46c`](https://github.com/aws-amplify/amplify-ui/commit/6b71ec46ccbf63c4605c9a57d3ecff098a42938a)]:
  - @aws-amplify/ui@5.6.8
  - @aws-amplify/ui-react-core@2.1.27
  - @aws-amplify/ui-react-core-notifications@1.0.4

## 1.2.21

### Patch Changes

- [#4227](https://github.com/aws-amplify/amplify-ui/pull/4227) [`d3ee05415`](https://github.com/aws-amplify/amplify-ui/commit/d3ee054159e1de81861bcd9273be9b1c87924cf4) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(react-native): border widths, spacing, font sizes, opacities in the theme don't throw runtime errors.

  These are all valid in a theme now:

  ```typescript
  const theme: Theme = {
    tokens: {
      borderWidths: {
        small: '4',
        medium: '1rem',
        large: 6,
      },
      opacities: {
        '10': '0.2',
      },
      space: {
        small: 4,
        medium: '6',
        large: '{space.small.value}',
      },
      fontSizes: {
        small: '1rem',
      },
    },
  };
  ```

- [#4215](https://github.com/aws-amplify/amplify-ui/pull/4215) [`279b3852c`](https://github.com/aws-amplify/amplify-ui/commit/279b3852cf579e10fab225536aa54850ab3a9424) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(rna): expose TS types of RNA static components

- [#4225](https://github.com/aws-amplify/amplify-ui/pull/4225) [`d87fb4beb`](https://github.com/aws-amplify/amplify-ui/commit/d87fb4beb4fa6e76ee09221a1a361553884ac42b) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(react-native): adding error styles to text field

- [#4107](https://github.com/aws-amplify/amplify-ui/pull/4107) [`6d14bf3f3`](https://github.com/aws-amplify/amplify-ui/commit/6d14bf3f386523bacd6832e56cc5903f644da88e) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui-react-native): Add Authenticator fields validations

- [#4247](https://github.com/aws-amplify/amplify-ui/pull/4247) [`41b9055c8`](https://github.com/aws-amplify/amplify-ui/commit/41b9055c821b44e9347146a9588755eeef588f13) Thanks [@calebpollman](https://github.com/calebpollman)! - feature(rna): update is signed in logic to read from Auth

- [#4239](https://github.com/aws-amplify/amplify-ui/pull/4239) [`30e0fce43`](https://github.com/aws-amplify/amplify-ui/commit/30e0fce430cbab200f572205b5c5ce6ff618972c) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(react-native): fix the theme components type

- Updated dependencies [[`78fdfd6c8`](https://github.com/aws-amplify/amplify-ui/commit/78fdfd6c8268c56204f905402162ad8cb40a0c8e), [`d3ee05415`](https://github.com/aws-amplify/amplify-ui/commit/d3ee054159e1de81861bcd9273be9b1c87924cf4), [`165a8abbd`](https://github.com/aws-amplify/amplify-ui/commit/165a8abbda8aa3e95fb9466fc60f8694c646d5bc), [`13098b36a`](https://github.com/aws-amplify/amplify-ui/commit/13098b36a75452d839955d141bd25f57538b1a22), [`37e490d39`](https://github.com/aws-amplify/amplify-ui/commit/37e490d3997a1dc55e2998c277790945921e6dc3), [`6d14bf3f3`](https://github.com/aws-amplify/amplify-ui/commit/6d14bf3f386523bacd6832e56cc5903f644da88e), [`aea82ff1b`](https://github.com/aws-amplify/amplify-ui/commit/aea82ff1bb6e066ed8b70433f4d72cd34bf0ccae)]:
  - @aws-amplify/ui@5.6.7
  - @aws-amplify/ui-react-core@2.1.26
  - @aws-amplify/ui-react-core-notifications@1.0.3

## 1.2.20

### Patch Changes

- [#4168](https://github.com/aws-amplify/amplify-ui/pull/4168) [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(RWA/RNA): deprecate passwordSettings prop

- Updated dependencies [[`b0e16e78c`](https://github.com/aws-amplify/amplify-ui/commit/b0e16e78c6a41945aa79f3e14fa3f9e6cb0e5e76), [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118)]:
  - @aws-amplify/ui@5.6.6
  - @aws-amplify/ui-react-core@2.1.25
  - @aws-amplify/ui-react-core-notifications@1.0.2

## 1.2.19

### Patch Changes

- [#4111](https://github.com/aws-amplify/amplify-ui/pull/4111) [`6f4b296fd`](https://github.com/aws-amplify/amplify-ui/commit/6f4b296fdbe73e1b8a37bede2e85d1ea8d819a54) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(react-native): add spacing between Radio icon and label

- [#4013](https://github.com/aws-amplify/amplify-ui/pull/4013) [`23180b470`](https://github.com/aws-amplify/amplify-ui/commit/23180b470c7b3b78a5970d00f8c2dc5ce8773eff) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-native): disable Authenticator submit button on invalid form

- Updated dependencies [[`23180b470`](https://github.com/aws-amplify/amplify-ui/commit/23180b470c7b3b78a5970d00f8c2dc5ce8773eff), [`3cecd0765`](https://github.com/aws-amplify/amplify-ui/commit/3cecd0765b46c77c49af24fae7cfb9054ebe2cdb)]:
  - @aws-amplify/ui-react-core@2.1.24
  - @aws-amplify/ui@5.6.5
  - @aws-amplify/ui-react-core-notifications@1.0.1

## 1.2.18

### Patch Changes

- [#3901](https://github.com/aws-amplify/amplify-ui/pull/3901) [`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776) Thanks [@sreeramsama](https://github.com/sreeramsama)! - - Adds new `ui-react-core-notifications` package for utilities related to the Notifications category, and new `ui-react-notifications` package for components like InAppMessaging. Also sets deprecation messages for `InAppMessagingDisplay`, `InAppMessagingProvider` and `useInAppMessaging` in `ui-react` package as they will be moved out in a future breaking change release.
  - Adds new `ui-react-geo` package for Geo related components like `MapView` and `LocationSearch`. They will be moved out from `ui-react` in a future breaking change release.
- Updated dependencies [[`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776), [`ca591a2fc`](https://github.com/aws-amplify/amplify-ui/commit/ca591a2fc319556f705be74bacd141d48f3531bd)]:
  - @aws-amplify/ui-react-core-notifications@1.0.0
  - @aws-amplify/ui-react-core@2.1.23
  - @aws-amplify/ui@5.6.4

## 1.2.17

### Patch Changes

- Updated dependencies [[`62425139f`](https://github.com/aws-amplify/amplify-ui/commit/62425139fb5e41a3b36b46aac1d31b965a2739fc)]:
  - @aws-amplify/ui@5.6.3
  - @aws-amplify/ui-react-core@2.1.22

## 1.2.16

### Patch Changes

- [#3806](https://github.com/aws-amplify/amplify-ui/pull/3806) [`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(ui): add event callbacks to defaultAuthHubHandler

- Updated dependencies [[`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86), [`82f3968b7`](https://github.com/aws-amplify/amplify-ui/commit/82f3968b7f750f069bda4ad7bfa9c34d7ee6091f)]:
  - @aws-amplify/ui-react-core@2.1.21
  - @aws-amplify/ui@5.6.2

## 1.2.15

### Patch Changes

- Updated dependencies [[`4ca838978`](https://github.com/aws-amplify/amplify-ui/commit/4ca838978d23a086f80859a7cb57f184ff49e2d4), [`d6a3676f2`](https://github.com/aws-amplify/amplify-ui/commit/d6a3676f2295ed39fa83b9d31a9540f3437ba129), [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54)]:
  - @aws-amplify/ui@5.6.1
  - @aws-amplify/ui-react-core@2.1.20

## 1.2.14

### Patch Changes

- [#3654](https://github.com/aws-amplify/amplify-ui/pull/3654) [`579ace564`](https://github.com/aws-amplify/amplify-ui/commit/579ace564ef85c4ec465b4ddfed38587c2669140) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(ui-react-native): remove themed selectionColor from TextField

- [#3674](https://github.com/aws-amplify/amplify-ui/pull/3674) [`2ad7c2f5b`](https://github.com/aws-amplify/amplify-ui/commit/2ad7c2f5b9b04b8beb4f1f9746cbdc5d37285851) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-native): loosen Authenticator.Container children prop, update docs

- Updated dependencies [[`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af), [`747516159`](https://github.com/aws-amplify/amplify-ui/commit/747516159d504b551dab09cbe8f214fa7b4505df)]:
  - @aws-amplify/ui@5.6.0
  - @aws-amplify/ui-react-core@2.1.19

## 1.2.13

### Patch Changes

- Updated dependencies [[`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819)]:
  - @aws-amplify/ui@5.5.10
  - @aws-amplify/ui-react-core@2.1.18

## 1.2.12

### Patch Changes

- Updated dependencies [[`5ee48f997`](https://github.com/aws-amplify/amplify-ui/commit/5ee48f99780ba5df889c1d66f24a0ebc9f601125)]:
  - @aws-amplify/ui@5.5.9
  - @aws-amplify/ui-react-core@2.1.17

## 1.2.11

### Patch Changes

- Updated dependencies [[`ee2c6981e`](https://github.com/aws-amplify/amplify-ui/commit/ee2c6981e19413f0d9a9fd093d14be934ae5d63b), [`9cc835828`](https://github.com/aws-amplify/amplify-ui/commit/9cc8358284be497e67911c335dfda76c8f41bf98)]:
  - @aws-amplify/ui@5.5.8
  - @aws-amplify/ui-react-core@2.1.16

## 1.2.10

### Patch Changes

- [#3497](https://github.com/aws-amplify/amplify-ui/pull/3497) [`5249a450d`](https://github.com/aws-amplify/amplify-ui/commit/5249a450dcd07487188fc57d5b6b04dbf52e1970) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(tsconfig): add configs directory and ts configuration

- Updated dependencies [[`a55aa4584`](https://github.com/aws-amplify/amplify-ui/commit/a55aa4584dd9aba4e97d4e36acc289238710d30e), [`6501852a7`](https://github.com/aws-amplify/amplify-ui/commit/6501852a7916cc2afb90bfb52461877c1e637b99), [`50fbe91de`](https://github.com/aws-amplify/amplify-ui/commit/50fbe91defab6172c09eb03c71671a5cc5f4d265), [`5249a450d`](https://github.com/aws-amplify/amplify-ui/commit/5249a450dcd07487188fc57d5b6b04dbf52e1970)]:
  - @aws-amplify/ui@5.5.7
  - @aws-amplify/ui-react-core@2.1.15

## 1.2.9

### Patch Changes

- [#3483](https://github.com/aws-amplify/amplify-ui/pull/3483) [`d7cc72c72`](https://github.com/aws-amplify/amplify-ui/commit/d7cc72c72844733d42a9504aa2ae1f2249abc178) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-native): add TS noImplicitAny for dist build

- [#3473](https://github.com/aws-amplify/amplify-ui/pull/3473) [`12d166209`](https://github.com/aws-amplify/amplify-ui/commit/12d166209b91ee94661e586a2f77e9fbf75b3d64) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui): remove type-fest

- [#3486](https://github.com/aws-amplify/amplify-ui/pull/3486) [`eb9df76f0`](https://github.com/aws-amplify/amplify-ui/commit/eb9df76f0b46aa577965740b476b18d070ccb276) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-native): remove extraneous optional chaining

- [#3446](https://github.com/aws-amplify/amplify-ui/pull/3446) [`ef40fcc76`](https://github.com/aws-amplify/amplify-ui/commit/ef40fcc7673a1d1ed7c7a006fa34d3d5b029956f) Thanks [@calebpollman](https://github.com/calebpollman)! - refactor(ui-react-native): update default keyboardVerticalOffset handling of RNA DefaultContainer

- Updated dependencies [[`3c5fef84c`](https://github.com/aws-amplify/amplify-ui/commit/3c5fef84cb6ad0cb830416e70028c0bb313dd99c), [`e08e62234`](https://github.com/aws-amplify/amplify-ui/commit/e08e6223473f56cbbc2d0ce4bab85ebd1caf020c), [`12d166209`](https://github.com/aws-amplify/amplify-ui/commit/12d166209b91ee94661e586a2f77e9fbf75b3d64), [`e283f14ca`](https://github.com/aws-amplify/amplify-ui/commit/e283f14cadf54c6f6ab7e729151ea5fe97776c6a), [`d28e31c36`](https://github.com/aws-amplify/amplify-ui/commit/d28e31c36a243d04737b6c13ce0307495680498a), [`c3116b894`](https://github.com/aws-amplify/amplify-ui/commit/c3116b89470587c127d53a5cb370b2574bde553a)]:
  - @aws-amplify/ui@5.5.6
  - @aws-amplify/ui-react-core@2.1.14

## 1.2.8

### Patch Changes

- [#3417](https://github.com/aws-amplify/amplify-ui/pull/3417) [`0c8fa2ac2`](https://github.com/aws-amplify/amplify-ui/commit/0c8fa2ac2b89e7617bbc601f29cc9cbf902d08ae) Thanks [@calebpollman](https://github.com/calebpollman)! - Migrate `capitalize` util to UI package

- Updated dependencies [[`0c8fa2ac2`](https://github.com/aws-amplify/amplify-ui/commit/0c8fa2ac2b89e7617bbc601f29cc9cbf902d08ae), [`d214551f0`](https://github.com/aws-amplify/amplify-ui/commit/d214551f0edb001878f7a04b4206c57a677ecfa8)]:
  - @aws-amplify/ui@5.5.5
  - @aws-amplify/ui-react-core@2.1.13

## 1.2.7

### Patch Changes

- Updated dependencies [[`bebe7b1cb`](https://github.com/aws-amplify/amplify-ui/commit/bebe7b1cb6a5efe1111eae237fedfabdd07ca7fc), [`7435b53fd`](https://github.com/aws-amplify/amplify-ui/commit/7435b53fd1a3303e2db0b74bf69b67fe41687563)]:
  - @aws-amplify/ui@5.5.4
  - @aws-amplify/ui-react-core@2.1.12

## 1.2.6

### Patch Changes

- [#3333](https://github.com/aws-amplify/amplify-ui/pull/3333) [`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): migrate totpSecretCode generation to state machine

- Updated dependencies [[`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc), [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184), [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a), [`13d0882a8`](https://github.com/aws-amplify/amplify-ui/commit/13d0882a8fe3a9ef63e4b217c5f67cef2c75e148)]:
  - @aws-amplify/ui-react-core@2.1.11
  - @aws-amplify/ui@5.5.3

## 1.2.5

### Patch Changes

- [#3198](https://github.com/aws-amplify/amplify-ui/pull/3198) [`9cb6696a2`](https://github.com/aws-amplify/amplify-ui/commit/9cb6696a227b7c5b4ce36920c2093289fa45cc95) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - fix(ui-react-native): Fixes an issue where undefined values end up in the state machine causing internal errors to be exposed to end users.

- Updated dependencies [[`57f1a3f43`](https://github.com/aws-amplify/amplify-ui/commit/57f1a3f438b8288ffda46764f7a87e1739e61313), [`dd9de348a`](https://github.com/aws-amplify/amplify-ui/commit/dd9de348abcafdcd721600f543d58353957dac25), [`4d652033e`](https://github.com/aws-amplify/amplify-ui/commit/4d652033e120daa82665b4bb4035b56fa8d33bf8)]:
  - @aws-amplify/ui@5.5.2
  - @aws-amplify/ui-react-core@2.1.10

## 1.2.4

### Patch Changes

- [#3283](https://github.com/aws-amplify/amplify-ui/pull/3283) [`98a632137`](https://github.com/aws-amplify/amplify-ui/commit/98a63213766d598ed6a64a06b53fffc408d547fd) Thanks [@wlee221](https://github.com/wlee221)! - Trim non-password fields on Authenticator forms. This will prevent unnecessary validation messages from showing up.

- Updated dependencies [[`98a632137`](https://github.com/aws-amplify/amplify-ui/commit/98a63213766d598ed6a64a06b53fffc408d547fd), [`01912077c`](https://github.com/aws-amplify/amplify-ui/commit/01912077c6d4fcdd3cbe9b6de2bb53fc490d0f41), [`08111e7e6`](https://github.com/aws-amplify/amplify-ui/commit/08111e7e60af5baf3b7e408f9545514c34e09078)]:
  - @aws-amplify/ui@5.5.1
  - @aws-amplify/ui-react-core@2.1.9

## 1.2.3

### Patch Changes

- [#3282](https://github.com/aws-amplify/amplify-ui/pull/3282) [`9b09654a7`](https://github.com/aws-amplify/amplify-ui/commit/9b09654a7e47ab70fb6d6b31f06de0289f25bbe9) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): remove order keys from formFields after sorting

- Updated dependencies [[`59321c9cc`](https://github.com/aws-amplify/amplify-ui/commit/59321c9cc15f8243edd6f5dd0113e7c396f7b488), [`9b09654a7`](https://github.com/aws-amplify/amplify-ui/commit/9b09654a7e47ab70fb6d6b31f06de0289f25bbe9)]:
  - @aws-amplify/ui@5.5.0
  - @aws-amplify/ui-react-core@2.1.8

## 1.2.2

### Patch Changes

- Updated dependencies [[`2912fe3af`](https://github.com/aws-amplify/amplify-ui/commit/2912fe3af6f29cde562a35e931bc2e3a0de470ed), [`ea1b10a2c`](https://github.com/aws-amplify/amplify-ui/commit/ea1b10a2c802b08ee019669ba442d7446f23bd05)]:
  - @aws-amplify/ui@5.4.2
  - @aws-amplify/ui-react-core@2.1.7

## 1.2.1

### Patch Changes

- [#3216](https://github.com/aws-amplify/amplify-ui/pull/3216) [`a4c5feea8`](https://github.com/aws-amplify/amplify-ui/commit/a4c5feea83057dc6fd615e2547c9456a81302060) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(rna): add Field component to address iOS TextInput secureTextEntry bug

- Updated dependencies [[`db8f019a7`](https://github.com/aws-amplify/amplify-ui/commit/db8f019a7737c4762ff19c1b03c7c06625277989), [`cbbf51f53`](https://github.com/aws-amplify/amplify-ui/commit/cbbf51f53c428dc378d8986ae27c3bf9e52f67ab)]:
  - @aws-amplify/ui@5.4.1
  - @aws-amplify/ui-react-core@2.1.6

## 1.2.0

### Minor Changes

- [#3158](https://github.com/aws-amplify/amplify-ui/pull/3158) [`0bbb9980c`](https://github.com/aws-amplify/amplify-ui/commit/0bbb9980c55f212ce54c5449a2dcc64bfce6ca8f) Thanks [@nandanbhat](https://github.com/nandanbhat)! - feat(Authenticator): Enable password validation on resetPassword and forceNewPassword screen

### Patch Changes

- [#2830](https://github.com/aws-amplify/amplify-ui/pull/2830) [`168185211`](https://github.com/aws-amplify/amplify-ui/commit/1681852112748717e44d199d0c62de83ab1541ca) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(authenticator): adding package version to cognito user agent string

- Updated dependencies [[`0bbb9980c`](https://github.com/aws-amplify/amplify-ui/commit/0bbb9980c55f212ce54c5449a2dcc64bfce6ca8f), [`168185211`](https://github.com/aws-amplify/amplify-ui/commit/1681852112748717e44d199d0c62de83ab1541ca)]:
  - @aws-amplify/ui@5.4.0
  - @aws-amplify/ui-react-core@2.1.5

## 1.1.4

### Patch Changes

- [#3164](https://github.com/aws-amplify/amplify-ui/pull/3164) [`7f99d8b1a`](https://github.com/aws-amplify/amplify-ui/commit/7f99d8b1a16b23c180c42a11a9bc992b5c4f2861) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(ui-react-native): update ErrorMessage style

- [#2921](https://github.com/aws-amplify/amplify-ui/pull/2921) [`2d0799002`](https://github.com/aws-amplify/amplify-ui/commit/2d0799002dbfa843a1720c2384eadba942333f76) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui-react-native): Add utility hook for pressable styles

- Updated dependencies [[`c31a9bf69`](https://github.com/aws-amplify/amplify-ui/commit/c31a9bf693b3507e8a2b9d0790423a9f64e533cf), [`1847840c0`](https://github.com/aws-amplify/amplify-ui/commit/1847840c00c0f9f7be31e9735c31bd596f4056e9)]:
  - @aws-amplify/ui@5.3.1
  - @aws-amplify/ui-react-core@2.1.4

## 1.1.3

### Patch Changes

- Updated dependencies [[`3653c8f39`](https://github.com/aws-amplify/amplify-ui/commit/3653c8f3914e3dc51fbcc328e59326afb422aa68), [`145d0b5f5`](https://github.com/aws-amplify/amplify-ui/commit/145d0b5f596ff7c9f623898af0bb3836516c51fe), [`e3867e369`](https://github.com/aws-amplify/amplify-ui/commit/e3867e369b4aeb5b240916cb88105353483b9b7c), [`4b2dbeb18`](https://github.com/aws-amplify/amplify-ui/commit/4b2dbeb18c79175bc0bfe0cf50a0e9d0429544d6), [`0377bccfb`](https://github.com/aws-amplify/amplify-ui/commit/0377bccfbea55606d007ae914a5d7f202bf87478)]:
  - @aws-amplify/ui@5.3.0
  - @aws-amplify/ui-react-core@2.1.3

## 1.1.2

### Patch Changes

- Updated dependencies [[`b416aca55`](https://github.com/aws-amplify/amplify-ui/commit/b416aca553649d37e2686c02f3223a77bf36ed98), [`8e5e696f4`](https://github.com/aws-amplify/amplify-ui/commit/8e5e696f4d0ae61e74537cdfe4395005cc21ce12), [`7f4248db4`](https://github.com/aws-amplify/amplify-ui/commit/7f4248db457639d1bb34c8318569ab047aa80c5e), [`a5b8696bc`](https://github.com/aws-amplify/amplify-ui/commit/a5b8696bc41d8cb2ff2c6fc39f8fd1afc349955a)]:
  - @aws-amplify/ui@5.2.0
  - @aws-amplify/ui-react-core@2.1.2

## 1.1.1

### Patch Changes

- Updated dependencies [[`d062010f4`](https://github.com/aws-amplify/amplify-ui/commit/d062010f4690321129c1fb1f777a7df82898640b)]:
  - @aws-amplify/ui@5.1.1
  - @aws-amplify/ui-react-core@2.1.1

## 1.1.0

### Minor Changes

- [#3067](https://github.com/aws-amplify/amplify-ui/pull/3067) [`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1) Thanks [@joebuono](https://github.com/joebuono)! - feat: Add React Native Authenticator

### Patch Changes

- Updated dependencies [[`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1), [`0234889ea`](https://github.com/aws-amplify/amplify-ui/commit/0234889eaf6dd8337e1140ee993be0380e80a5bf)]:
  - @aws-amplify/ui@5.1.0
  - @aws-amplify/ui-react-core@2.1.0

## 1.0.0

### Major Changes

- [#2962](https://github.com/aws-amplify/amplify-ui/pull/2962) [`11c7d9c60`](https://github.com/aws-amplify/amplify-ui/commit/11c7d9c602af211cd0b378742e8975f936d61fc5) Thanks [@calebpollman](https://github.com/calebpollman)! - Release In-App Messaging feature for React and React Native
  PR: https://github.com/aws-amplify/amplify-ui/pull/2798

### Patch Changes

- Updated dependencies [[`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7), [`5ec150f4e`](https://github.com/aws-amplify/amplify-ui/commit/5ec150f4ee6fd5d0186fa3b8e55cc98089f4c80e), [`4a22217e0`](https://github.com/aws-amplify/amplify-ui/commit/4a22217e0f92ef71baaffc4346bee9599db62c20), [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a), [`d90b148c0`](https://github.com/aws-amplify/amplify-ui/commit/d90b148c0e06b3321f4f05fad2b32ef52c04214d)]:
  - @aws-amplify/ui@5.0.0
  - @aws-amplify/ui-react-core@2.0.0
