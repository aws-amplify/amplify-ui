# @aws-amplify/ui-react-liveness

## 1.0.1

### Patch Changes

- [#4062](https://github.com/aws-amplify/amplify-ui/pull/4062) [`c56cde0ff`](https://github.com/aws-amplify/amplify-ui/commit/c56cde0ff5c144f60dfd2bc46adf0a1c53984f0c) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(liveness): increase ws connection timeout to 10s, default was 2s

- [#4053](https://github.com/aws-amplify/amplify-ui/pull/4053) [`fba989bed`](https://github.com/aws-amplify/amplify-ui/commit/fba989bed2b388d104b86f5eb17a26da6e6d5415) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): upgrade `@aws-sdk/client-rekognitionstreaming` to version patched with `fast-xml-parser` version `4.2.4`

- [#4026](https://github.com/aws-amplify/amplify-ui/pull/4026) [`6981696bb`](https://github.com/aws-amplify/amplify-ui/commit/6981696bb3c01494519b0ba6d230225ae20dc707) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): fix flickering progress bar bug

- [#4034](https://github.com/aws-amplify/amplify-ui/pull/4034) [`34efa0196`](https://github.com/aws-amplify/amplify-ui/commit/34efa0196dbb09e3c9aac54fec5910e1dfc4be49) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): catch websocket connection errors

- [#4048](https://github.com/aws-amplify/amplify-ui/pull/4048) [`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83) Thanks [@calebpollman](https://github.com/calebpollman)! - **Breaking Changes**:

  - `@aws-amplify/ui-react@5.x` removes the `to` prop on `Link` component and instead have it extended from the underlying rendered third-party `Link` if it contains a `to` prop ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).

  - `@aws-amplify/ui-react@5.x` strictly types the `View` component and updates all component types to include the underlying rendered HTML element's attributes ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).

- Updated dependencies [[`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83)]:

  - @aws-amplify/ui-react@5.0.0

- Updated dependencies [[`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776), [`ca591a2fc`](https://github.com/aws-amplify/amplify-ui/commit/ca591a2fc319556f705be74bacd141d48f3531bd)]:

  - @aws-amplify/ui-react@4.6.4
  - @aws-amplify/ui@5.6.4

- [#3718](https://github.com/aws-amplify/amplify-ui/pull/3718) [`4ca838978`](https://github.com/aws-amplify/amplify-ui/commit/4ca838978d23a086f80859a7cb57f184ff49e2d4) Thanks [@0618](https://github.com/0618)! - Losslessly compress images

## 1.0.0

### Major Changes

- [#3677](https://github.com/aws-amplify/amplify-ui/pull/3677) [`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af) Thanks [@thaddmt](https://github.com/thaddmt)! - feat: Add ui-react-liveness and FaceLivenessDetector component

### Patch Changes

- [#3698](https://github.com/aws-amplify/amplify-ui/pull/3698) [`36d9d5922`](https://github.com/aws-amplify/amplify-ui/commit/36d9d592272a42fc920b61b85d56c240af8e9bac) Thanks [@thaddmt](https://github.com/thaddmt)! - Revert "chore(liveness): add legal disclaimer (#3695)"

- Updated dependencies [[`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af), [`c3918d9ab`](https://github.com/aws-amplify/amplify-ui/commit/c3918d9aba1a9bedf8f1c8d45097f85b8ca9d482), [`747516159`](https://github.com/aws-amplify/amplify-ui/commit/747516159d504b551dab09cbe8f214fa7b4505df)]:
  - @aws-amplify/ui@5.6.0
  - @aws-amplify/ui-react@4.6.0
