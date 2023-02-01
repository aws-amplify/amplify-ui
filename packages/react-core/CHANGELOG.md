# @aws-amplify/ui-react-core

## 2.1.11

### Patch Changes

- [#3333](https://github.com/aws-amplify/amplify-ui/pull/3333) [`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): migrate totpSecretCode generation to state machine

- [#3287](https://github.com/aws-amplify/amplify-ui/pull/3287) [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184) Thanks [@zchenwei](https://github.com/zchenwei)! - build: updates to support Node ESM

  Confirmed that both #3155 and #3206 are fixed without having to apply any workaround

  Also, test out the changes with the following frameworks/tools:

  | Name               | Tested? | Notes                                                                                                                                         |
  | ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
  | Next.js@11, 12, 13 | ✅      |                                                                                                                                               |
  | Gatsby             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Remix              | ✅      |                                                                                                                                               |
  | Astro              | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | webpack            | ✅      |                                                                                                                                               |
  | Vite               | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Rollup             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | esbuild            | ✅      |                                                                                                                                               |
  | Parcel             | ✅      |                                                                                                                                               |
  | Snowpack           | ✅      | Need `--polyfill-node` to fix JS incompatibility in dev mode, but is a known [issue](https://github.com/FredKSchott/snowpack/discussions/718) |

- [#3291](https://github.com/aws-amplify/amplify-ui/pull/3291) [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui,ui-react-core): Add type guard utils

- Updated dependencies [[`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc), [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184), [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a), [`13d0882a8`](https://github.com/aws-amplify/amplify-ui/commit/13d0882a8fe3a9ef63e4b217c5f67cef2c75e148)]:
  - @aws-amplify/ui@5.5.3

## 2.1.10

### Patch Changes

- Updated dependencies [[`57f1a3f43`](https://github.com/aws-amplify/amplify-ui/commit/57f1a3f438b8288ffda46764f7a87e1739e61313), [`dd9de348a`](https://github.com/aws-amplify/amplify-ui/commit/dd9de348abcafdcd721600f543d58353957dac25), [`4d652033e`](https://github.com/aws-amplify/amplify-ui/commit/4d652033e120daa82665b4bb4035b56fa8d33bf8)]:
  - @aws-amplify/ui@5.5.2

## 2.1.9

### Patch Changes

- [#3265](https://github.com/aws-amplify/amplify-ui/pull/3265) [`08111e7e6`](https://github.com/aws-amplify/amplify-ui/commit/08111e7e60af5baf3b7e408f9545514c34e09078) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react): lint primitives (P-S)

- Updated dependencies [[`98a632137`](https://github.com/aws-amplify/amplify-ui/commit/98a63213766d598ed6a64a06b53fffc408d547fd), [`01912077c`](https://github.com/aws-amplify/amplify-ui/commit/01912077c6d4fcdd3cbe9b6de2bb53fc490d0f41)]:
  - @aws-amplify/ui@5.5.1

## 2.1.8

### Patch Changes

- Updated dependencies [[`59321c9cc`](https://github.com/aws-amplify/amplify-ui/commit/59321c9cc15f8243edd6f5dd0113e7c396f7b488), [`9b09654a7`](https://github.com/aws-amplify/amplify-ui/commit/9b09654a7e47ab70fb6d6b31f06de0289f25bbe9)]:
  - @aws-amplify/ui@5.5.0

## 2.1.7

### Patch Changes

- Updated dependencies [[`2912fe3af`](https://github.com/aws-amplify/amplify-ui/commit/2912fe3af6f29cde562a35e931bc2e3a0de470ed), [`ea1b10a2c`](https://github.com/aws-amplify/amplify-ui/commit/ea1b10a2c802b08ee019669ba442d7446f23bd05)]:
  - @aws-amplify/ui@5.4.2

## 2.1.6

### Patch Changes

- [#3183](https://github.com/aws-amplify/amplify-ui/pull/3183) [`cbbf51f53`](https://github.com/aws-amplify/amplify-ui/commit/cbbf51f53c428dc378d8986ae27c3bf9e52f67ab) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed MFA totpIssuer and totpUsername so it displays correctly in QR code when scanned.

- Updated dependencies [[`db8f019a7`](https://github.com/aws-amplify/amplify-ui/commit/db8f019a7737c4762ff19c1b03c7c06625277989)]:
  - @aws-amplify/ui@5.4.1

## 2.1.5

### Patch Changes

- Updated dependencies [[`0bbb9980c`](https://github.com/aws-amplify/amplify-ui/commit/0bbb9980c55f212ce54c5449a2dcc64bfce6ca8f), [`168185211`](https://github.com/aws-amplify/amplify-ui/commit/1681852112748717e44d199d0c62de83ab1541ca)]:
  - @aws-amplify/ui@5.4.0

## 2.1.4

### Patch Changes

- Updated dependencies [[`c31a9bf69`](https://github.com/aws-amplify/amplify-ui/commit/c31a9bf693b3507e8a2b9d0790423a9f64e533cf), [`1847840c0`](https://github.com/aws-amplify/amplify-ui/commit/1847840c00c0f9f7be31e9735c31bd596f4056e9)]:
  - @aws-amplify/ui@5.3.1

## 2.1.3

### Patch Changes

- Updated dependencies [[`3653c8f39`](https://github.com/aws-amplify/amplify-ui/commit/3653c8f3914e3dc51fbcc328e59326afb422aa68), [`145d0b5f5`](https://github.com/aws-amplify/amplify-ui/commit/145d0b5f596ff7c9f623898af0bb3836516c51fe), [`e3867e369`](https://github.com/aws-amplify/amplify-ui/commit/e3867e369b4aeb5b240916cb88105353483b9b7c), [`4b2dbeb18`](https://github.com/aws-amplify/amplify-ui/commit/4b2dbeb18c79175bc0bfe0cf50a0e9d0429544d6), [`0377bccfb`](https://github.com/aws-amplify/amplify-ui/commit/0377bccfbea55606d007ae914a5d7f202bf87478)]:
  - @aws-amplify/ui@5.3.0

## 2.1.2

### Patch Changes

- Updated dependencies [[`b416aca55`](https://github.com/aws-amplify/amplify-ui/commit/b416aca553649d37e2686c02f3223a77bf36ed98), [`8e5e696f4`](https://github.com/aws-amplify/amplify-ui/commit/8e5e696f4d0ae61e74537cdfe4395005cc21ce12), [`7f4248db4`](https://github.com/aws-amplify/amplify-ui/commit/7f4248db457639d1bb34c8318569ab047aa80c5e), [`a5b8696bc`](https://github.com/aws-amplify/amplify-ui/commit/a5b8696bc41d8cb2ff2c6fc39f8fd1afc349955a)]:
  - @aws-amplify/ui@5.2.0

## 2.1.1

### Patch Changes

- Updated dependencies [[`d062010f4`](https://github.com/aws-amplify/amplify-ui/commit/d062010f4690321129c1fb1f777a7df82898640b)]:
  - @aws-amplify/ui@5.1.1

## 2.1.0

### Minor Changes

- [#3067](https://github.com/aws-amplify/amplify-ui/pull/3067) [`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1) Thanks [@joebuono](https://github.com/joebuono)! - feat: Add React Native Authenticator

### Patch Changes

- Updated dependencies [[`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1), [`0234889ea`](https://github.com/aws-amplify/amplify-ui/commit/0234889eaf6dd8337e1140ee993be0380e80a5bf)]:
  - @aws-amplify/ui@5.1.0

## 2.0.0

### Major Changes

- [#2703](https://github.com/aws-amplify/amplify-ui/pull/2703) [`5ec150f4e`](https://github.com/aws-amplify/amplify-ui/commit/5ec150f4ee6fd5d0186fa3b8e55cc98089f4c80e) Thanks [@calebpollman](https://github.com/calebpollman)! - Remove useAuthenticator internal variables `_state` and `_send` (See #2685)

- [#2772](https://github.com/aws-amplify/amplify-ui/pull/2772) [`4a22217e0`](https://github.com/aws-amplify/amplify-ui/commit/4a22217e0f92ef71baaffc4346bee9599db62c20) Thanks [@zchenwei](https://github.com/zchenwei)! - BREAKING CHANGE(react): bump up React minimum support version to 16.14.0 and update JSX transform

### Patch Changes

- Updated dependencies [[`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7), [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a), [`d90b148c0`](https://github.com/aws-amplify/amplify-ui/commit/d90b148c0e06b3321f4f05fad2b32ef52c04214d)]:
  - @aws-amplify/ui@5.0.0

## 1.0.5

### Patch Changes

- Updated dependencies [[`702a35738`](https://github.com/aws-amplify/amplify-ui/commit/702a3573850639c492c51ce10e27e194d720d5ac), [`0935da51a`](https://github.com/aws-amplify/amplify-ui/commit/0935da51ac04334e458339da2bf0ef72f248cf26)]:
  - @aws-amplify/ui@4.1.0

## 1.0.4

### Patch Changes

- Updated dependencies [[`05bb8c792`](https://github.com/aws-amplify/amplify-ui/commit/05bb8c79264e37c9d0592405f4a33e9a309de732), [`5bd5e695a`](https://github.com/aws-amplify/amplify-ui/commit/5bd5e695a71e0cbef85a17f4ee1c851c84b4d51d), [`6aa1132e7`](https://github.com/aws-amplify/amplify-ui/commit/6aa1132e760eef892021dbadafa63456c1c3a39d), [`ea1ea36a6`](https://github.com/aws-amplify/amplify-ui/commit/ea1ea36a650bd6677c97556b8c1e85705cd37a35)]:
  - @aws-amplify/ui@4.0.1

## 1.0.3

### Patch Changes

- [#2746](https://github.com/aws-amplify/amplify-ui/pull/2746) [`2893da04b`](https://github.com/aws-amplify/amplify-ui/commit/2893da04b4616efc342f6973169d03fef0113c7b) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-core): add missing value to AuthenticatorRouteComponentKey

## 1.0.2

### Patch Changes

- [#2702](https://github.com/aws-amplify/amplify-ui/pull/2702) [`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906) Thanks [@slaymance](https://github.com/slaymance)! - Make xstate core dependency of only framework libraries

- Updated dependencies [[`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906)]:
  - @aws-amplify/ui@4.0.0

## 1.0.1

### Patch Changes

- Updated dependencies [[`42143228f`](https://github.com/aws-amplify/amplify-ui/commit/42143228fd8e99500e05fee34cee3f8067189c4e)]:
  - @aws-amplify/ui@3.14.0

## 1.0.0

### Major Changes

- [#2659](https://github.com/aws-amplify/amplify-ui/pull/2659) [`477a00593`](https://github.com/aws-amplify/amplify-ui/commit/477a005935f242b49e776d42054810bc5d115857) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(ui-react-core): merge ui-react-core in to main
