# @aws-amplify/ui-vue

## 3.0.5

### Patch Changes

- Updated dependencies [[`c31a9bf69`](https://github.com/aws-amplify/amplify-ui/commit/c31a9bf693b3507e8a2b9d0790423a9f64e533cf), [`1847840c0`](https://github.com/aws-amplify/amplify-ui/commit/1847840c00c0f9f7be31e9735c31bd596f4056e9)]:
  - @aws-amplify/ui@5.3.1

## 3.0.4

### Patch Changes

- Updated dependencies [[`3653c8f39`](https://github.com/aws-amplify/amplify-ui/commit/3653c8f3914e3dc51fbcc328e59326afb422aa68), [`145d0b5f5`](https://github.com/aws-amplify/amplify-ui/commit/145d0b5f596ff7c9f623898af0bb3836516c51fe), [`e3867e369`](https://github.com/aws-amplify/amplify-ui/commit/e3867e369b4aeb5b240916cb88105353483b9b7c), [`4b2dbeb18`](https://github.com/aws-amplify/amplify-ui/commit/4b2dbeb18c79175bc0bfe0cf50a0e9d0429544d6), [`0377bccfb`](https://github.com/aws-amplify/amplify-ui/commit/0377bccfbea55606d007ae914a5d7f202bf87478)]:
  - @aws-amplify/ui@5.3.0

## 3.0.3

### Patch Changes

- Updated dependencies [[`b416aca55`](https://github.com/aws-amplify/amplify-ui/commit/b416aca553649d37e2686c02f3223a77bf36ed98), [`8e5e696f4`](https://github.com/aws-amplify/amplify-ui/commit/8e5e696f4d0ae61e74537cdfe4395005cc21ce12), [`7f4248db4`](https://github.com/aws-amplify/amplify-ui/commit/7f4248db457639d1bb34c8318569ab047aa80c5e), [`a5b8696bc`](https://github.com/aws-amplify/amplify-ui/commit/a5b8696bc41d8cb2ff2c6fc39f8fd1afc349955a)]:
  - @aws-amplify/ui@5.2.0

## 3.0.2

### Patch Changes

- Updated dependencies [[`d062010f4`](https://github.com/aws-amplify/amplify-ui/commit/d062010f4690321129c1fb1f777a7df82898640b)]:
  - @aws-amplify/ui@5.1.1

## 3.0.1

### Patch Changes

- Updated dependencies [[`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1), [`0234889ea`](https://github.com/aws-amplify/amplify-ui/commit/0234889eaf6dd8337e1140ee993be0380e80a5bf)]:
  - @aws-amplify/ui@5.1.0

## 3.0.0

### Major Changes

- [#2828](https://github.com/aws-amplify/amplify-ui/pull/2828) [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(next-release): render Authenticator field labels

- [#2735](https://github.com/aws-amplify/amplify-ui/pull/2735) [`fa3135add`](https://github.com/aws-amplify/amplify-ui/commit/fa3135add1346465db19b9d252ae26edaed70e3b) Thanks [@wlee221](https://github.com/wlee221)! - **Breaking**: We replaced following legacy Authenticator texts:

  - `Send Code` in reset password screen is replaced by `Send code`.
  - `Forgot your password? ` with the trailing space is replaced by `Forgot your password`.

  If you were using `I18n` to translate those keys, please update your translations accordingly to match the new strings.

### Patch Changes

- [#2877](https://github.com/aws-amplify/amplify-ui/pull/2877) [`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7) Thanks [@ErikCH](https://github.com/ErikCH)! - **BREAKING**: When overriding `Auth.signUp`, update the override function call to include the `autoSignIn` option set to enabled. This is now required.

  ```diff
   async handleSignUp(formData) {
    let { username, password, attributes } = formData;
    // custom username
    username = username.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return Auth.signUp({
      username,
      password,
      attributes,
  +   autoSignIn: {
  +     enabled: true
  +   }
    });
  }

  ```

- Updated dependencies [[`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7), [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a), [`d90b148c0`](https://github.com/aws-amplify/amplify-ui/commit/d90b148c0e06b3321f4f05fad2b32ef52c04214d)]:
  - @aws-amplify/ui@5.0.0

## 2.4.26

### Patch Changes

- Updated dependencies [[`702a35738`](https://github.com/aws-amplify/amplify-ui/commit/702a3573850639c492c51ce10e27e194d720d5ac), [`0935da51a`](https://github.com/aws-amplify/amplify-ui/commit/0935da51ac04334e458339da2bf0ef72f248cf26)]:
  - @aws-amplify/ui@4.1.0

## 2.4.25

### Patch Changes

- Updated dependencies [[`05bb8c792`](https://github.com/aws-amplify/amplify-ui/commit/05bb8c79264e37c9d0592405f4a33e9a309de732), [`5bd5e695a`](https://github.com/aws-amplify/amplify-ui/commit/5bd5e695a71e0cbef85a17f4ee1c851c84b4d51d), [`6aa1132e7`](https://github.com/aws-amplify/amplify-ui/commit/6aa1132e760eef892021dbadafa63456c1c3a39d), [`ea1ea36a6`](https://github.com/aws-amplify/amplify-ui/commit/ea1ea36a650bd6677c97556b8c1e85705cd37a35)]:
  - @aws-amplify/ui@4.0.1

## 2.4.24

### Patch Changes

- [#2702](https://github.com/aws-amplify/amplify-ui/pull/2702) [`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906) Thanks [@slaymance](https://github.com/slaymance)! - Make xstate core dependency of only framework libraries

- [#2712](https://github.com/aws-amplify/amplify-ui/pull/2712) [`ea3afab68`](https://github.com/aws-amplify/amplify-ui/commit/ea3afab6893ca6e60ff42eb048a5f4f7b4750829) Thanks [@wlee221](https://github.com/wlee221)! - fix(vue): replace legacy `sr-only` with `amplify-visually-hidden`

- Updated dependencies [[`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906)]:
  - @aws-amplify/ui@4.0.0

## 2.4.23

### Patch Changes

- Updated dependencies [[`42143228f`](https://github.com/aws-amplify/amplify-ui/commit/42143228fd8e99500e05fee34cee3f8067189c4e)]:
  - @aws-amplify/ui@3.14.0

## 2.4.22

### Patch Changes

- [#2616](https://github.com/aws-amplify/amplify-ui/pull/2616) [`83bcc0844`](https://github.com/aws-amplify/amplify-ui/commit/83bcc0844eb1049ab49ff4f79280605ef31230d6) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react, ui): expose Authenticator types, add AmplifyUser interface

- Updated dependencies [[`83bcc0844`](https://github.com/aws-amplify/amplify-ui/commit/83bcc0844eb1049ab49ff4f79280605ef31230d6)]:
  - @aws-amplify/ui@3.13.4

## 2.4.21

### Patch Changes

- Updated dependencies [[`e2429807b`](https://github.com/aws-amplify/amplify-ui/commit/e2429807bcc13b7c2dfe2c2947be8e790eea4d9d)]:
  - @aws-amplify/ui@3.13.3

## 2.4.20

### Patch Changes

- [#2544](https://github.com/aws-amplify/amplify-ui/pull/2544) [`35dae2a3d`](https://github.com/aws-amplify/amplify-ui/commit/35dae2a3d7ec392c60a7302e3673e59a0e42b7aa) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rwa): convert AuthChallengeNames enum to string union

* [#2539](https://github.com/aws-amplify/amplify-ui/pull/2539) [`ba9818fb7`](https://github.com/aws-amplify/amplify-ui/commit/ba9818fb7acc727eaf7968aad8ff4dd1ab36327b) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug in Angular Authenticator that caused the Setup TOTP page to not show the correct totpIssuer and totpUsername in the QR code when overwritten by formFields. Refactored and added in Jest tests for Angular.

* Updated dependencies [[`35dae2a3d`](https://github.com/aws-amplify/amplify-ui/commit/35dae2a3d7ec392c60a7302e3673e59a0e42b7aa), [`4a4b5c93d`](https://github.com/aws-amplify/amplify-ui/commit/4a4b5c93d37b66c845cbf20dac1e09e6e7931610), [`ba9818fb7`](https://github.com/aws-amplify/amplify-ui/commit/ba9818fb7acc727eaf7968aad8ff4dd1ab36327b)]:
  - @aws-amplify/ui@3.13.2

## 2.4.19

### Patch Changes

- [#2459](https://github.com/aws-amplify/amplify-ui/pull/2459) [`8350d36e2`](https://github.com/aws-amplify/amplify-ui/commit/8350d36e217587e06632ea5704d8c51e70559edc) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Angular: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
  Vue: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
  React: Added 'dialCode' versions of all 'countryCode' props so that users can begin migrating away from the deprecated `countryCode`.

  ```
  countryCodeLabel => dialCodeLabel
  countryCodeName => dialCodeName
  onCountryCodeChange => onDialCodeChange
  countryCodeRef => dialCodeRef
  defaultCountryCode => defaultDialCode
  ```

- Updated dependencies [[`b60fec2c4`](https://github.com/aws-amplify/amplify-ui/commit/b60fec2c451b31946f893efbf23710c7631db122)]:
  - @aws-amplify/ui@3.13.1

## 2.4.18

### Patch Changes

- [#2419](https://github.com/aws-amplify/amplify-ui/pull/2419) [`8def8dc6a`](https://github.com/aws-amplify/amplify-ui/commit/8def8dc6ab8cf2448f110b0a9d4309b43a561541) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - Hide decorative alert icons from screen readers.

- Updated dependencies [[`b3e6a97e8`](https://github.com/aws-amplify/amplify-ui/commit/b3e6a97e8e17f6b822af0387e3c543c50aea7c64), [`1cfa1a054`](https://github.com/aws-amplify/amplify-ui/commit/1cfa1a054451a75738f4011c4200c34208285b5b), [`eae79ae15`](https://github.com/aws-amplify/amplify-ui/commit/eae79ae1529b9a920d704cb12e92addb352d0c40), [`e25bc4269`](https://github.com/aws-amplify/amplify-ui/commit/e25bc42693cc4fa1cdcf7ad2fe7034ff44fbb18e), [`1f358d8fa`](https://github.com/aws-amplify/amplify-ui/commit/1f358d8fa18367020d0c41b74dcce1ba73974376)]:
  - @aws-amplify/ui@3.13.0

## 2.4.17

### Patch Changes

- Updated dependencies [[`de1c874f2`](https://github.com/aws-amplify/amplify-ui/commit/de1c874f294a3b21cc9d7a97b310d2744d18b065), [`3c468a0f3`](https://github.com/aws-amplify/amplify-ui/commit/3c468a0f34fb8f747b925dd1a66a0f0f0117436a), [`1fcfa3c02`](https://github.com/aws-amplify/amplify-ui/commit/1fcfa3c02dc8eedb2acdc7425be7311f5b1accef), [`adc9ff6e3`](https://github.com/aws-amplify/amplify-ui/commit/adc9ff6e3c7d1408edb7de58c1858ddc4f47d1c7)]:
  - @aws-amplify/ui@3.12.5

## 2.4.16

### Patch Changes

- [#2339](https://github.com/aws-amplify/amplify-ui/pull/2339) [`12de8fa5b`](https://github.com/aws-amplify/amplify-ui/commit/12de8fa5b4a4ed3786a0ee9db9d3724e226e3698) Thanks [@ErikCH](https://github.com/ErikCH)! - Adds an accessible label for the Alert dismiss button, which is configurable via translation.

- Updated dependencies [[`8418028a3`](https://github.com/aws-amplify/amplify-ui/commit/8418028a3218ea20ccb2ac949b1e6e33c57239e6), [`f067420b9`](https://github.com/aws-amplify/amplify-ui/commit/f067420b9a39807a46bd409dce17f2bcc297218e), [`d9dd9220c`](https://github.com/aws-amplify/amplify-ui/commit/d9dd9220c367bc476fddb36e89daff75d62e7f31)]:
  - @aws-amplify/ui@3.12.4

## 2.4.15

### Patch Changes

- Updated dependencies [[`bde5e7a48`](https://github.com/aws-amplify/amplify-ui/commit/bde5e7a48a144bf76f77b1b747dcc912ce8cec6e), [`74e8c8935`](https://github.com/aws-amplify/amplify-ui/commit/74e8c89354bd551723f62ac2a3b60e5222d92d58)]:
  - @aws-amplify/ui@3.12.3

## 2.4.14

### Patch Changes

- [#2296](https://github.com/aws-amplify/amplify-ui/pull/2296) [`8659e2f7e`](https://github.com/aws-amplify/amplify-ui/commit/8659e2f7efc986c9ec71cdc245de57fa425b0f5b) Thanks [@ErikCH](https://github.com/ErikCH)! - Vue library had a bug that was causing types to not show correctly. This fix corrects the package.json to point to the correct definition file.

## 2.4.13

### Patch Changes

- [#2184](https://github.com/aws-amplify/amplify-ui/pull/2184) [`a8b77d484`](https://github.com/aws-amplify/amplify-ui/commit/a8b77d4849fe6df85b61c8af23a264d40f799de6) Thanks [@ErikCH](https://github.com/ErikCH)! - Cleaned Vue code. Updated jest to latest. Added in JSX. Updated how editor displays interface in .vue files.

- Updated dependencies [[`90eb39280`](https://github.com/aws-amplify/amplify-ui/commit/90eb392806c7875d2659bd0bb52aa6b68b849ce7), [`3b2d6c2af`](https://github.com/aws-amplify/amplify-ui/commit/3b2d6c2afb51178ed6ba6312c29b368c522e460a)]:
  - @aws-amplify/ui@3.12.2

## 2.4.12

### Patch Changes

- Updated dependencies [[`09d738a0f`](https://github.com/aws-amplify/amplify-ui/commit/09d738a0f9e1a67367b3bdb45bcb9644f20e2600)]:
  - @aws-amplify/ui@3.12.1

## 2.4.11

### Patch Changes

- Updated dependencies [[`ffadbe883`](https://github.com/aws-amplify/amplify-ui/commit/ffadbe8837996fee24477ad5325559904c011150), [`897e55de9`](https://github.com/aws-amplify/amplify-ui/commit/897e55de962672d76cccdb5e13f8e4f180316a9b), [`bc882121a`](https://github.com/aws-amplify/amplify-ui/commit/bc882121a8d0e005099e2827c3bde68d56647100), [`710a6ec43`](https://github.com/aws-amplify/amplify-ui/commit/710a6ec4313f19077f723b75cf804d8508abca77)]:
  - @aws-amplify/ui@3.12.0

## 2.4.10

### Patch Changes

- Updated dependencies [[`c568b96bc`](https://github.com/aws-amplify/amplify-ui/commit/c568b96bc579b6d1f2783695b1c2f2237d4678b9)]:
  - @aws-amplify/ui@3.11.1

## 2.4.9

### Patch Changes

- [#2044](https://github.com/aws-amplify/amplify-ui/pull/2044) [`b48d52d46`](https://github.com/aws-amplify/amplify-ui/commit/b48d52d4606a8dfc136818d2dab3080102de8057) Thanks [@wlee221](https://github.com/wlee221)! - Adds aria-describedBy to angular and vue authenticator input fields. This will make error messages accessible.

- Updated dependencies [[`5eedbbed4`](https://github.com/aws-amplify/amplify-ui/commit/5eedbbed4d04fc00a50d37ae3be61522212eb5cb), [`e37b666d9`](https://github.com/aws-amplify/amplify-ui/commit/e37b666d967aa444984f9881e7267c0ea171716a), [`ef790e5fd`](https://github.com/aws-amplify/amplify-ui/commit/ef790e5fd0d6c91311a4db2456f7de10f8fdad7a), [`540b4ce97`](https://github.com/aws-amplify/amplify-ui/commit/540b4ce97a7c68ea3783bc67e8da4cce1d52e706), [`736cfe7cb`](https://github.com/aws-amplify/amplify-ui/commit/736cfe7cb3544bf0ecae5ab2c3b2caf381b497c4), [`d8085741b`](https://github.com/aws-amplify/amplify-ui/commit/d8085741b23175458adba9b3c05e97408aaa6413), [`f6ee1355c`](https://github.com/aws-amplify/amplify-ui/commit/f6ee1355c75ee802c76a34d140c3e052fc0afaeb), [`a168acdc6`](https://github.com/aws-amplify/amplify-ui/commit/a168acdc69e7e44625b0bbf30a020dc1f7bcde8e), [`5f3d3a264`](https://github.com/aws-amplify/amplify-ui/commit/5f3d3a2642401788f1fc79334140c5f3cfc83876), [`28bf92ddb`](https://github.com/aws-amplify/amplify-ui/commit/28bf92ddbd893a3c2839d5215537f845db46b181)]:
  - @aws-amplify/ui@3.11.0

## 2.4.8

### Patch Changes

- Updated dependencies [[`6c267aaf8`](https://github.com/aws-amplify/amplify-ui/commit/6c267aaf8b6cb656458e3398cc923e0e259ea9a2)]:
  - @aws-amplify/ui@3.10.0

## 2.4.7

### Patch Changes

- [#1937](https://github.com/aws-amplify/amplify-ui/pull/1937) [`e9240b21e`](https://github.com/aws-amplify/amplify-ui/commit/e9240b21e10cc6f3bb97f42e0101d575e1b7d0b7) Thanks [@wlee221](https://github.com/wlee221)! - Removed floating border that appears between transitions in Vue and Angular Authenticator.

- Updated dependencies [[`766bf302c`](https://github.com/aws-amplify/amplify-ui/commit/766bf302c4d594ae92f1506967b6f1858687a41c), [`766bf302c`](https://github.com/aws-amplify/amplify-ui/commit/766bf302c4d594ae92f1506967b6f1858687a41c), [`a41ecfbf1`](https://github.com/aws-amplify/amplify-ui/commit/a41ecfbf1e7fc35e20622a6fb514c3bab7404621)]:
  - @aws-amplify/ui@3.9.2

## 2.4.6

### Patch Changes

- [#1928](https://github.com/aws-amplify/amplify-ui/pull/1928) [`a917b08bb`](https://github.com/aws-amplify/amplify-ui/commit/a917b08bbf6d845e602b36b5d1632955a86d6557) Thanks [@ErikCH](https://github.com/ErikCH)! - Turned on ESLint for the Vue.js package. Fixed the following ESLint errors:

  - The `alias-control`, `authenticator`, `amplify-button`, `base-select`, `reset-password` and `federated-sign-in-button` all had the improper use of destructuring props, and was fixed.

  - Several components had typecasted the `HTMLInputElement` incorrectly, which was fixed.

  - Turned off `vue/multi-word-component-names` for the `authenticator` component, since it needs to match other frameworks.

  - Turned off `no-explicity-any` in the `useAuth` and `index.ts` file. We'll be adding types to `useAuth` in a future PR.

- Updated dependencies [[`376c39fc0`](https://github.com/aws-amplify/amplify-ui/commit/376c39fc04aec3a41d02a722a62d4b8e4eb43230)]:
  - @aws-amplify/ui@3.9.1

## 2.4.5

### Patch Changes

- [#1868](https://github.com/aws-amplify/amplify-ui/pull/1868) [`1c3e35a8d`](https://github.com/aws-amplify/amplify-ui/commit/1c3e35a8df815402da68c203b84cf599064c863a) Thanks [@wlee221](https://github.com/wlee221)! - This PR adds additional safeguards to hub event listeners we use. Now, we will only pass hub events to the auth machine if it is in the correct state.

- Updated dependencies [[`62edc9ee3`](https://github.com/aws-amplify/amplify-ui/commit/62edc9ee34a64a81190631fed31cf388bcf3b2e0), [`1c3e35a8d`](https://github.com/aws-amplify/amplify-ui/commit/1c3e35a8df815402da68c203b84cf599064c863a), [`937498b3f`](https://github.com/aws-amplify/amplify-ui/commit/937498b3ff016f2f76f60d861a995b8b1bb77bdf), [`5c5e89407`](https://github.com/aws-amplify/amplify-ui/commit/5c5e89407d2946be61ffb4ab5a4e9d7352c41065)]:
  - @aws-amplify/ui@3.9.0

## 2.4.4

### Patch Changes

- Updated dependencies [[`7dbd14546`](https://github.com/aws-amplify/amplify-ui/commit/7dbd145461d27a8cb1ba63a261e543a154dd8343), [`716e24298`](https://github.com/aws-amplify/amplify-ui/commit/716e2429848592254f0b53df6470a53ac735b71c)]:
  - @aws-amplify/ui@3.8.3

## 2.4.3

### Patch Changes

- [#1772](https://github.com/aws-amplify/amplify-ui/pull/1772) [`9c25f80b6`](https://github.com/aws-amplify/amplify-ui/commit/9c25f80b6f4c84e0e1727873e3dd78b3ce5684a0) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Refactor of styling to flatten css selectors across angular, react, and vue

- Updated dependencies [[`e9ae76995`](https://github.com/aws-amplify/amplify-ui/commit/e9ae7699589ec005475b4fc16dac7164ad9e0caa), [`9c25f80b6`](https://github.com/aws-amplify/amplify-ui/commit/9c25f80b6f4c84e0e1727873e3dd78b3ce5684a0)]:
  - @aws-amplify/ui@3.8.2

## 2.4.2

### Patch Changes

- [#1814](https://github.com/aws-amplify/amplify-ui/pull/1814) [`d66a7265e`](https://github.com/aws-amplify/amplify-ui/commit/d66a7265e9de36b1d8a1ad05745ffc7ad734b003) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Remove inline styling from vue authenticator

- Updated dependencies [[`286e7df79`](https://github.com/aws-amplify/amplify-ui/commit/286e7df790a103d164cd8424161a9cd6dc4483e3)]:
  - @aws-amplify/ui@3.8.1

## 2.4.1

### Patch Changes

- [#1838](https://github.com/aws-amplify/amplify-ui/pull/1838) [`8efa2b238`](https://github.com/aws-amplify/amplify-ui/commit/8efa2b238319f591e0397f89d302dcda9bb6aa8a) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug with MS Authenticator not working with Setup TOTP page

- Updated dependencies [[`b1656e136`](https://github.com/aws-amplify/amplify-ui/commit/b1656e13612b5a748cc19be6eeeb44bf70822fda), [`f2ab1b8e4`](https://github.com/aws-amplify/amplify-ui/commit/f2ab1b8e468597e7b81284b46cd4b03dcd02e201)]:
  - @aws-amplify/ui@3.8.0

## 2.4.0

### Minor Changes

- [#1804](https://github.com/aws-amplify/amplify-ui/pull/1804) [`3e5b93e25`](https://github.com/aws-amplify/amplify-ui/commit/3e5b93e25b8e410497332eedf194d2871acb3e79) Thanks [@ErikCH](https://github.com/ErikCH)! - New authStatus feature, to check if a user is authenticated or not

### Patch Changes

- Updated dependencies [[`3e5b93e25`](https://github.com/aws-amplify/amplify-ui/commit/3e5b93e25b8e410497332eedf194d2871acb3e79)]:
  - @aws-amplify/ui@3.7.0

## 2.3.15

### Patch Changes

- Updated dependencies [[`331df831f`](https://github.com/aws-amplify/amplify-ui/commit/331df831fd7ddeb8c6f28b4cb385d23d1aa524be)]:
  - @aws-amplify/ui@3.6.8

## 2.3.14

### Patch Changes

- Updated dependencies [[`cd710a07c`](https://github.com/aws-amplify/amplify-ui/commit/cd710a07c52c1db57899eaf3feba4fde52c08df2)]:
  - @aws-amplify/ui@3.6.7

## 2.3.13

### Patch Changes

- Updated dependencies [[`84fd81868`](https://github.com/aws-amplify/amplify-ui/commit/84fd818689daa5220bfb55ebee7e280454e1c705), [`a9c5aa5f5`](https://github.com/aws-amplify/amplify-ui/commit/a9c5aa5f56c4d222cd8bd652d0fd549aea3576ef)]:
  - @aws-amplify/ui@3.6.6

## 2.3.12

### Patch Changes

- Updated dependencies [[`57e104e16`](https://github.com/aws-amplify/amplify-ui/commit/57e104e169bc1d6b5de6ffa285c0494204c98579)]:
  - @aws-amplify/ui@3.6.5

## 2.3.11

### Patch Changes

- Updated dependencies [[`1601b3f94`](https://github.com/aws-amplify/amplify-ui/commit/1601b3f94d68acd1df0e592c6328f19b29620447)]:
  - @aws-amplify/ui@3.6.4

## 2.3.10

### Patch Changes

- Updated dependencies [[`34a19a541`](https://github.com/aws-amplify/amplify-ui/commit/34a19a541b4b733a6688a38a435423e9c607e918), [`16dced7de`](https://github.com/aws-amplify/amplify-ui/commit/16dced7de5edc73c064b7ec4bddbefe586e98393)]:
  - @aws-amplify/ui@3.6.3

## 2.3.9

### Patch Changes

- Updated dependencies [[`b9a181bc9`](https://github.com/aws-amplify/amplify-ui/commit/b9a181bc9da2411017877a91dc931812e8371bb8)]:
  - @aws-amplify/ui@3.6.2

## 2.3.8

### Patch Changes

- Updated dependencies [[`68cf0494f`](https://github.com/aws-amplify/amplify-ui/commit/68cf0494f15356af54ee5aa0b4749cdd9a104aca), [`e799d32a4`](https://github.com/aws-amplify/amplify-ui/commit/e799d32a4a298e526a3469ee813597a1d09dfd58), [`e799d32a4`](https://github.com/aws-amplify/amplify-ui/commit/e799d32a4a298e526a3469ee813597a1d09dfd58)]:
  - @aws-amplify/ui@3.6.1

## 2.3.7

### Patch Changes

- Updated dependencies [[`ab9aef8f3`](https://github.com/aws-amplify/amplify-ui/commit/ab9aef8f329612abc2818db6b4477377aaa3ca62), [`992c5f6fb`](https://github.com/aws-amplify/amplify-ui/commit/992c5f6fb3eb3c1c5a9514029c4c17f53d8d7b5b)]:
  - @aws-amplify/ui@3.6.0

## 2.3.6

### Patch Changes

- Updated dependencies [[`ff74c1d1c`](https://github.com/aws-amplify/amplify-ui/commit/ff74c1d1cab859d977dfc0638f0193af842d2bbd)]:
  - @aws-amplify/ui@3.5.1

## 2.3.5

### Patch Changes

- Updated dependencies [[`4d0a8424e`](https://github.com/aws-amplify/amplify-ui/commit/4d0a8424e2592be52a59e610f0eb1068c6ab0d5a), [`e20720a89`](https://github.com/aws-amplify/amplify-ui/commit/e20720a894ccb2cfcc7ede7160299e082ec76fd2), [`4dee728f2`](https://github.com/aws-amplify/amplify-ui/commit/4dee728f25735ce8bc8793806a395dfcee579522)]:
  - @aws-amplify/ui@3.5.0

## 2.3.4

### Patch Changes

- Updated dependencies [[`c00b0f016`](https://github.com/aws-amplify/amplify-ui/commit/c00b0f0161f4df56c3d2ec75ffe0d2975bb859ac)]:
  - @aws-amplify/ui@3.4.1

## 2.3.3

### Patch Changes

- [#1580](https://github.com/aws-amplify/amplify-ui/pull/1580) [`1ac9cda71`](https://github.com/aws-amplify/amplify-ui/commit/1ac9cda712dc7eb7bc7293999340e05059648c93) Thanks [@wlee221](https://github.com/wlee221)! - fix(authenticator): look for current user on routed apps whenever app refreshes

* [#1592](https://github.com/aws-amplify/amplify-ui/pull/1592) [`fc0acacdf`](https://github.com/aws-amplify/amplify-ui/commit/fc0acacdf9247574d1605b32c03537c1768c43f1) Thanks [@wlee221](https://github.com/wlee221)! - Fix unscription timing issues in Vue/Angular

* Updated dependencies [[`1ac9cda71`](https://github.com/aws-amplify/amplify-ui/commit/1ac9cda712dc7eb7bc7293999340e05059648c93), [`d47da90a6`](https://github.com/aws-amplify/amplify-ui/commit/d47da90a68d936e2cc22a972a876ef10aca0eaf3), [`6d3981c4a`](https://github.com/aws-amplify/amplify-ui/commit/6d3981c4a26721361e4461d206b0b37d72d67dbd)]:
  - @aws-amplify/ui@3.4.0

## 2.3.2

### Patch Changes

- Updated dependencies [[`7910c04b5`](https://github.com/aws-amplify/amplify-ui/commit/7910c04b55cb32e3e8a70c3966f509ea43a0dc64), [`30e3155ac`](https://github.com/aws-amplify/amplify-ui/commit/30e3155ac70d3f82c00da562332ce701ade45817)]:
  - @aws-amplify/ui@3.3.2

## 2.3.1

### Patch Changes

- [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - refactor: share default form fields generation logic

* [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - Default `labelHidden` to false. This can be adjusted in a later PR for better UX.

- [#1514](https://github.com/aws-amplify/amplify-ui/pull/1514) [`5ca96c4a8`](https://github.com/aws-amplify/amplify-ui/commit/5ca96c4a81722aca00caecb35dc98d17588c6ff1) Thanks [@amirHossein-Ebrahimi](https://github.com/amirHossein-Ebrahimi)! - feat: Add repository information to UI packages

* [#1495](https://github.com/aws-amplify/amplify-ui/pull/1495) [`71abbbe28`](https://github.com/aws-amplify/amplify-ui/commit/71abbbe28c8e87aed63dac8131534cfaeb071843) Thanks [@0618](https://github.com/0618)! - fix a11y errors

* Updated dependencies [[`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2), [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2), [`5ca96c4a8`](https://github.com/aws-amplify/amplify-ui/commit/5ca96c4a81722aca00caecb35dc98d17588c6ff1), [`1e9c6c031`](https://github.com/aws-amplify/amplify-ui/commit/1e9c6c031b1e5401c456365f0ff3187ed35c6f22)]:
  - @aws-amplify/ui@3.3.1

## 2.3.0

### Minor Changes

- [#1492](https://github.com/aws-amplify/amplify-ui/pull/1492) [`0bfe79caa`](https://github.com/aws-amplify/amplify-ui/commit/0bfe79caa63b037c1c9633c240b35203799f2fab) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new password complexity errors that will show during sign up. Based on the zero-config

### Patch Changes

- Updated dependencies [[`0bfe79caa`](https://github.com/aws-amplify/amplify-ui/commit/0bfe79caa63b037c1c9633c240b35203799f2fab), [`ebcc7e610`](https://github.com/aws-amplify/amplify-ui/commit/ebcc7e610fda12f74ba6c5bd6dda89bc4849b898)]:
  - @aws-amplify/ui@3.3.0

## 2.2.2

### Patch Changes

- [#1472](https://github.com/aws-amplify/amplify-ui/pull/1472) [`ef5dff599`](https://github.com/aws-amplify/amplify-ui/commit/ef5dff599b84dd4b508827264758b11439684142) Thanks [@wlee221](https://github.com/wlee221)! - Set confirmation code input types to `"number"`

* [#1469](https://github.com/aws-amplify/amplify-ui/pull/1469) [`3c0b705e3`](https://github.com/aws-amplify/amplify-ui/commit/3c0b705e3c5eb25a80bea077a6c60a52dc7ffa51) Thanks [@wlee221](https://github.com/wlee221)! - Capitalize form field related types. No actual runtime changes.

* Updated dependencies [[`05a1fa3c3`](https://github.com/aws-amplify/amplify-ui/commit/05a1fa3c3970f04bb87a336aafe87cf3f1946107), [`b97cb9126`](https://github.com/aws-amplify/amplify-ui/commit/b97cb91264d03eed0ce248909708eed112eb9aec), [`ef5dff599`](https://github.com/aws-amplify/amplify-ui/commit/ef5dff599b84dd4b508827264758b11439684142), [`3c0b705e3`](https://github.com/aws-amplify/amplify-ui/commit/3c0b705e3c5eb25a80bea077a6c60a52dc7ffa51), [`9e8d6b212`](https://github.com/aws-amplify/amplify-ui/commit/9e8d6b212bdbc324b75066d664b6adb1ef46163d)]:
  - @aws-amplify/ui@3.2.1

## 2.2.1

### Patch Changes

- [#1457](https://github.com/aws-amplify/amplify-ui/pull/1457) [`17f66a09c`](https://github.com/aws-amplify/amplify-ui/commit/17f66a09cdfc786b91815cfe2f08b605574e678a) Thanks [@wlee221](https://github.com/wlee221)! - Reflect totp svg changes to Vue and Angular Authenticator.

- Updated dependencies [[`5f1753785`](https://github.com/aws-amplify/amplify-ui/commit/5f175378571e56c1f59bfa39060337148f428ce2), [`4c1a5cfbe`](https://github.com/aws-amplify/amplify-ui/commit/4c1a5cfbe6e984a790261d122ee4df368b249688), [`3d5acaa4c`](https://github.com/aws-amplify/amplify-ui/commit/3d5acaa4cce5ea8daf49caab71d92dc3c91d9021), [`731587a58`](https://github.com/aws-amplify/amplify-ui/commit/731587a58e8ef89e9f0193d7118377093a6024b8), [`3343e187b`](https://github.com/aws-amplify/amplify-ui/commit/3343e187b6dc9eab2c2a9c2d408bac8afb063f74)]:
  - @aws-amplify/ui@3.2.0

## 2.2.0

### Minor Changes

- [#1389](https://github.com/aws-amplify/amplify-ui/pull/1389) [`57f1441e4`](https://github.com/aws-amplify/amplify-ui/commit/57f1441e4809218a813148d0942de8171d159831) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new formfields prop that allows more customization of inputs and setup TOTP.
  New docs can be found at https://ui.docs.amplify.aws/components/authenticator#form-field-customization

### Patch Changes

- Updated dependencies [[`74e066622`](https://github.com/aws-amplify/amplify-ui/commit/74e066622e9abe26e9f9427f6bdc82c4e14d4952), [`57f1441e4`](https://github.com/aws-amplify/amplify-ui/commit/57f1441e4809218a813148d0942de8171d159831), [`5b3b8479a`](https://github.com/aws-amplify/amplify-ui/commit/5b3b8479aea06c6b7df031dc6493abdd36b0bd6a)]:
  - @aws-amplify/ui@3.1.0

## 2.1.3

### Patch Changes

- [#1368](https://github.com/aws-amplify/amplify-ui/pull/1368) [`c57a02349`](https://github.com/aws-amplify/amplify-ui/commit/c57a02349376b4fea82bc9f854971445aa01c676) Thanks [@zchenwei](https://github.com/zchenwei)! - style: cleaning up sr-only class

* [#1366](https://github.com/aws-amplify/amplify-ui/pull/1366) [`e73e0276f`](https://github.com/aws-amplify/amplify-ui/commit/e73e0276f8b1707cd01e24d55bd023b4a2347625) Thanks [@wlee221](https://github.com/wlee221)! - Pass `formData` to `submitForm` event on submit. This will ensure any default form values are submitted to Cognito, without relying on `CHANGE` events.

- [#1357](https://github.com/aws-amplify/amplify-ui/pull/1357) [`65ed5351f`](https://github.com/aws-amplify/amplify-ui/commit/65ed5351f2ca850ddf7db0c9a002ff563351f138) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new translations for confirm sign up page

- Updated dependencies [[`fbfcd04d3`](https://github.com/aws-amplify/amplify-ui/commit/fbfcd04d36753a69d24d5576736a9082f1a66dbe), [`c57a02349`](https://github.com/aws-amplify/amplify-ui/commit/c57a02349376b4fea82bc9f854971445aa01c676), [`e73e0276f`](https://github.com/aws-amplify/amplify-ui/commit/e73e0276f8b1707cd01e24d55bd023b4a2347625), [`929cb8f76`](https://github.com/aws-amplify/amplify-ui/commit/929cb8f768d9a95b3854d7fa87b08a83af72c96c)]:
  - @aws-amplify/ui@3.0.15

## 2.1.2

### Patch Changes

- [#1320](https://github.com/aws-amplify/amplify-ui/pull/1320) [`94d09948a`](https://github.com/aws-amplify/amplify-ui/commit/94d09948ac9d36a49b1872751f0587e73413bd99) Thanks [@wlee221](https://github.com/wlee221)! - Re-export `translations` from ui-[framework] packages. This lets you use `translations` directly:

  ```diff
  - import { translations } from '@aws-amplify/ui';
  + import { translations } from '@aws-amplify/ui-[framework]';
  ```

- Updated dependencies [[`722e2a932`](https://github.com/aws-amplify/amplify-ui/commit/722e2a93263478aed2a9aee872ab1fcbc86b41ca), [`4c6d198e4`](https://github.com/aws-amplify/amplify-ui/commit/4c6d198e409d46eef37b88b2327132b4a5dbe425), [`38cdf38e4`](https://github.com/aws-amplify/amplify-ui/commit/38cdf38e473853ba93ffb22a1d9252286a7d2a6f)]:
  - @aws-amplify/ui@3.0.14

## 2.1.1

### Patch Changes

- Updated dependencies [[`f9bb30efd`](https://github.com/aws-amplify/amplify-ui/commit/f9bb30efd4c0a384162fbcef22d4b5bccec62dc5), [`7c81bacdf`](https://github.com/aws-amplify/amplify-ui/commit/7c81bacdfdc71d71843b8a7285e513e09e9842cb), [`4e19822e4`](https://github.com/aws-amplify/amplify-ui/commit/4e19822e4d995d4cb3b3ad23090a161249806939), [`b4254e58a`](https://github.com/aws-amplify/amplify-ui/commit/b4254e58ac3473bd141e48b3a553c632a84fab5c)]:
  - @aws-amplify/ui@3.0.13

## 2.1.0

### Minor Changes

- [#1260](https://github.com/aws-amplify/amplify-ui/pull/1260) [`ecd7bea7e`](https://github.com/aws-amplify/amplify-ui/commit/ecd7bea7ee4466930c15bceb8986e0a090d0570e) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new hide sign up prop, for Vue, Angular, and React

## 2.0.12

### Patch Changes

- [#1251](https://github.com/aws-amplify/amplify-ui/pull/1251) [`2913fe8cb`](https://github.com/aws-amplify/amplify-ui/commit/2913fe8cb35e08ad6c61121dfb9d12b4ae9cf6ad) Thanks [@joebuono](https://github.com/joebuono)! - Pin all dependencies

- Updated dependencies [[`f7d86db6d`](https://github.com/aws-amplify/amplify-ui/commit/f7d86db6dbd3af650ce4c64e6efbc5acb4523e78), [`b824136bf`](https://github.com/aws-amplify/amplify-ui/commit/b824136bfb288df0f3300421f73f9bfdcd61bf57), [`2913fe8cb`](https://github.com/aws-amplify/amplify-ui/commit/2913fe8cb35e08ad6c61121dfb9d12b4ae9cf6ad)]:
  - @aws-amplify/ui@3.0.12

## 2.0.11

### Patch Changes

- [#1224](https://github.com/aws-amplify/amplify-ui/pull/1224) [`4932b43f8`](https://github.com/aws-amplify/amplify-ui/commit/4932b43f8f3ad5d851a4fd8635b1b92abf6c4ef0) Thanks [@wlee221](https://github.com/wlee221)! - Pin xstate versions

- Updated dependencies [[`4932b43f8`](https://github.com/aws-amplify/amplify-ui/commit/4932b43f8f3ad5d851a4fd8635b1b92abf6c4ef0)]:
  - @aws-amplify/ui@3.0.11

## 2.0.10

### Patch Changes

- [#1153](https://github.com/aws-amplify/amplify-ui/pull/1153) [`3afdc1fc9`](https://github.com/aws-amplify/amplify-ui/commit/3afdc1fc9a876a17403ccfc607b922ec352fd1cf) Thanks [@wlee221](https://github.com/wlee221)! - Listen to Auth Hub events

* [#1176](https://github.com/aws-amplify/amplify-ui/pull/1176) [`f7f77237e`](https://github.com/aws-amplify/amplify-ui/commit/f7f77237e69272f1d1d878620946e2914354b503) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new force new password fields component. Also auto detect required attributes on force new password page.

* Updated dependencies [[`3afdc1fc9`](https://github.com/aws-amplify/amplify-ui/commit/3afdc1fc9a876a17403ccfc607b922ec352fd1cf)]:
  - @aws-amplify/ui@3.0.10

## 2.0.9

### Patch Changes

- [#1181](https://github.com/aws-amplify/amplify-ui/pull/1181) [`5481b9e0a`](https://github.com/aws-amplify/amplify-ui/commit/5481b9e0a963ab219d97588f21c833bf0a1edb1c) Thanks [@sgpopov](https://github.com/sgpopov)! - fixed setting secret key value when generating TOTP QR code

* [#1162](https://github.com/aws-amplify/amplify-ui/pull/1162) [`e0fcf3685`](https://github.com/aws-amplify/amplify-ui/commit/e0fcf3685164075fe385f8e09247f9620a7e6ccc) Thanks [@wlee221](https://github.com/wlee221)! - Add explicit `INIT` step for initializing authMachine

* Updated dependencies [[`6c070b2e1`](https://github.com/aws-amplify/amplify-ui/commit/6c070b2e118560dec9629c7c0abdfb218d53267c), [`e0fcf3685`](https://github.com/aws-amplify/amplify-ui/commit/e0fcf3685164075fe385f8e09247f9620a7e6ccc), [`3a69c2a75`](https://github.com/aws-amplify/amplify-ui/commit/3a69c2a752b9ab07bb55911cae6447dccd76cc1f)]:
  - @aws-amplify/ui@3.0.9

## 2.0.8

### Patch Changes

- Updated dependencies [[`c5cc41a70`](https://github.com/aws-amplify/amplify-ui/commit/c5cc41a70d7c0de4b2dcae385f7661361455e7b6)]:
  - @aws-amplify/ui@3.0.8

## 2.0.7

### Patch Changes

- [#1083](https://github.com/aws-amplify/amplify-ui/pull/1083) [`2e7dbaeab`](https://github.com/aws-amplify/amplify-ui/commit/2e7dbaeaba19b8fc2a450acae0efa3e05810938e) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated QR code page so users on mobile don't have to take a picture of the QR code

* [#1088](https://github.com/aws-amplify/amplify-ui/pull/1088) [`a2fa3603e`](https://github.com/aws-amplify/amplify-ui/commit/a2fa3603eda90a67c9a092ce170e86d13a152e18) Thanks [@wlee221](https://github.com/wlee221)! - Remove trailing space on "Forgot your password? "

* Updated dependencies [[`1d5b84ac8`](https://github.com/aws-amplify/amplify-ui/commit/1d5b84ac828b962648e9b8600ed96297b1eb0c2a), [`9a095ae46`](https://github.com/aws-amplify/amplify-ui/commit/9a095ae46ee6639f7c8fe9a3a7b2b871449867b8), [`a2fa3603e`](https://github.com/aws-amplify/amplify-ui/commit/a2fa3603eda90a67c9a092ce170e86d13a152e18), [`87af74164`](https://github.com/aws-amplify/amplify-ui/commit/87af74164fb87b61d3c897b03af6e15cf73de79d), [`352a28197`](https://github.com/aws-amplify/amplify-ui/commit/352a281970f2568e7ea035cc89fb51afa31cbfc4)]:
  - @aws-amplify/ui@3.0.7

## 2.0.6

### Patch Changes

- [#1052](https://github.com/aws-amplify/amplify-ui/pull/1052) [`5d96f7331`](https://github.com/aws-amplify/amplify-ui/commit/5d96f733110bb453245ccb76e275919cd8e3f5ef) Thanks [@ErikCH](https://github.com/ErikCH)! - Added wrapper for useAuthenticator to handle better memory usage

* [#1082](https://github.com/aws-amplify/amplify-ui/pull/1082) [`a4a1e21f1`](https://github.com/aws-amplify/amplify-ui/commit/a4a1e21f15afe2e4bdb05db166fdb92bb4685b63) Thanks [@ErikCH](https://github.com/ErikCH)! - Added back fonts that were deleted in previous PR

* Updated dependencies [[`5bfe1e599`](https://github.com/aws-amplify/amplify-ui/commit/5bfe1e5996536f8b5ada60e16db565dd8fb52f26), [`86e70f8e8`](https://github.com/aws-amplify/amplify-ui/commit/86e70f8e8486e70cccc23d04754e435b184915e8), [`43634b06a`](https://github.com/aws-amplify/amplify-ui/commit/43634b06aaccb1cf33cb18e0e142aee91df54aad), [`d8a422d7c`](https://github.com/aws-amplify/amplify-ui/commit/d8a422d7ce4c62a216a19d127907a2b80eb588ab), [`f9a09df7c`](https://github.com/aws-amplify/amplify-ui/commit/f9a09df7cded5bae1681bc138c048786f3bb75bc)]:
  - @aws-amplify/ui@3.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [[`63f773ee2`](https://github.com/aws-amplify/amplify-ui/commit/63f773ee2af1f55f1891794c1de1398e3eb47d93), [`88b15eb9a`](https://github.com/aws-amplify/amplify-ui/commit/88b15eb9aa608b58ca84fbf60e1beba8090f32e2)]:
  - @aws-amplify/ui@3.0.5

## 2.0.4

### Patch Changes

- [#910](https://github.com/aws-amplify/amplify-ui/pull/910) [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0) Thanks [@ErikCH](https://github.com/ErikCH)! - Added text to confirm sign up page, so user knows where code was delivered.

* [#912](https://github.com/aws-amplify/amplify-ui/pull/912) [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76) Thanks [@wlee221](https://github.com/wlee221)! - Fix height jumps between screens and tabs

- [#949](https://github.com/aws-amplify/amplify-ui/pull/949) [`aec9a9479`](https://github.com/aws-amplify/amplify-ui/commit/aec9a9479198240cbe1f535114121e58443f0733) Thanks [@ErikCH](https://github.com/ErikCH)! - Added a way for users to add in custom translations for error messages returned from cognito.

- Updated dependencies [[`72b543ded`](https://github.com/aws-amplify/amplify-ui/commit/72b543ded4c37325a0eb1e4a4803aa88d6d73d5d), [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0), [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76), [`712edfccc`](https://github.com/aws-amplify/amplify-ui/commit/712edfccc77a71542166431ba79b25a31d0dca80), [`f1c2d82db`](https://github.com/aws-amplify/amplify-ui/commit/f1c2d82db913be13425e8b4476983d7cf6f55c40)]:
  - @aws-amplify/ui@3.0.4

## 2.0.3

### Patch Changes

- [#858](https://github.com/aws-amplify/amplify-ui/pull/858) [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated the password validation logic, so errors are only display on blur, or when six or more characters is typed for both the confirm password and password fields.

- Updated dependencies [[`5d115786c`](https://github.com/aws-amplify/amplify-ui/commit/5d115786c23ce6292842467b4417b26a15f60cb5), [`b21e3e3cb`](https://github.com/aws-amplify/amplify-ui/commit/b21e3e3cb6688238a513f8b125d3be36145dadca), [`4a12ed4f5`](https://github.com/aws-amplify/amplify-ui/commit/4a12ed4f580f852de2558ec3fcf0da152f74dbd5), [`907cd18df`](https://github.com/aws-amplify/amplify-ui/commit/907cd18df6213d432a4b3c5d18c848717e3703e4), [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917)]:
  - @aws-amplify/ui@3.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [[`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f), [`e77e47fe5`](https://github.com/aws-amplify/amplify-ui/commit/e77e47fe5872961bb70d53bfb54f95d5a9d89ef4), [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec), [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046), [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8), [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca), [`c41c6fad1`](https://github.com/aws-amplify/amplify-ui/commit/c41c6fad138269dc72bec682bf7e15341d09ec8a)]:
  - @aws-amplify/ui@3.0.2

## 2.0.1

### Patch Changes

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
