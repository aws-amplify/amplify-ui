# @aws-amplify/ui-react-liveness

## 2.0.0

### Major Changes

- [#4134](https://github.com/aws-amplify/amplify-ui/pull/4134) [`d09da6935`](https://github.com/aws-amplify/amplify-ui/commit/d09da69352f3330300f0b101949395c0e39db142) Thanks [@thaddmt](https://github.com/thaddmt)! - breaking(liveness): update onError callback to use LivenessError type instead of Error

- [#4106](https://github.com/aws-amplify/amplify-ui/pull/4106) [`d165ddfb2`](https://github.com/aws-amplify/amplify-ui/commit/d165ddfb20cbbae921db5774ef12735796722452) Thanks [@thaddmt](https://github.com/thaddmt)! - **Breaking**: Update liveness component default cdn to use rekognition cdn. Note: customers with CSP policies will need to update their policy to allow the new default cdn url at - https://cdn.liveness.rekognition.amazonaws.com

### Minor Changes

- [#4260](https://github.com/aws-amplify/amplify-ui/pull/4260) [`e4bf31234`](https://github.com/aws-amplify/amplify-ui/commit/e4bf3123409ab813d118e87c95777cd5bcaff313) Thanks [@thaddmt](https://github.com/thaddmt)! - feat(liveness): Liveness cred provider

### Patch Changes

- [#4238](https://github.com/aws-amplify/amplify-ui/pull/4238) [`78fab28c6`](https://github.com/aws-amplify/amplify-ui/commit/78fab28c6d83dc5d286df4adeaf4ea349963d762) Thanks [@thaddmt](https://github.com/thaddmt)! - feat(liveness): remove 3 second countdown from liveness check

- [#4194](https://github.com/aws-amplify/amplify-ui/pull/4194) [`13098b36a`](https://github.com/aws-amplify/amplify-ui/commit/13098b36a75452d839955d141bd25f57538b1a22) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(liveness): move inline css to classes

- Updated dependencies [[`78fdfd6c8`](https://github.com/aws-amplify/amplify-ui/commit/78fdfd6c8268c56204f905402162ad8cb40a0c8e), [`d3ee05415`](https://github.com/aws-amplify/amplify-ui/commit/d3ee054159e1de81861bcd9273be9b1c87924cf4), [`165a8abbd`](https://github.com/aws-amplify/amplify-ui/commit/165a8abbda8aa3e95fb9466fc60f8694c646d5bc), [`13098b36a`](https://github.com/aws-amplify/amplify-ui/commit/13098b36a75452d839955d141bd25f57538b1a22), [`f0b32d275`](https://github.com/aws-amplify/amplify-ui/commit/f0b32d27509cbc00013e96f6cfc735695b7784c8), [`c3a418d8d`](https://github.com/aws-amplify/amplify-ui/commit/c3a418d8d8bd057c27de59379033c2c538762141), [`37e490d39`](https://github.com/aws-amplify/amplify-ui/commit/37e490d3997a1dc55e2998c277790945921e6dc3), [`aea82ff1b`](https://github.com/aws-amplify/amplify-ui/commit/aea82ff1bb6e066ed8b70433f4d72cd34bf0ccae)]:
  - @aws-amplify/ui@5.6.7
  - @aws-amplify/ui-react@5.0.5

## 1.0.6

### Patch Changes

- [#4122](https://github.com/aws-amplify/amplify-ui/pull/4122) [`0dc976595`](https://github.com/aws-amplify/amplify-ui/commit/0dc9765955b8406f8f062ad65400261a8b34bc3a) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(liveness): improve face match percentage performance

- [#4174](https://github.com/aws-amplify/amplify-ui/pull/4174) [`bc5533c14`](https://github.com/aws-amplify/amplify-ui/commit/bc5533c145da3a048533813ad893a1b0d96ea341) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): liveness package name in user agent

- [#4150](https://github.com/aws-amplify/amplify-ui/pull/4150) [`699345400`](https://github.com/aws-amplify/amplify-ui/commit/699345400dafb1e2fa6b341934c6ce3fe553b1f8) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): remove websocket error showing up after connection closes

- [#4177](https://github.com/aws-amplify/amplify-ui/pull/4177) [`19d4114ce`](https://github.com/aws-amplify/amplify-ui/commit/19d4114ce2706b8dbba6df6c4f07f800f1a04c39) Thanks [@wlee221](https://github.com/wlee221)! - Bump `@aws-sdk/client-rekognitionstreaming` to 3.360.0

- Updated dependencies [[`572730f7b`](https://github.com/aws-amplify/amplify-ui/commit/572730f7b16b87a6b2ab0c40116a4c8c5acdbd36)]:
  - @aws-amplify/ui-react@5.0.4

## 1.0.5

### Patch Changes

- Updated dependencies [[`b0e16e78c`](https://github.com/aws-amplify/amplify-ui/commit/b0e16e78c6a41945aa79f3e14fa3f9e6cb0e5e76), [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118)]:
  - @aws-amplify/ui-react@5.0.3
  - @aws-amplify/ui@5.6.6

## 1.0.4

### Patch Changes

- [#4095](https://github.com/aws-amplify/amplify-ui/pull/4095) [`2bda547aa`](https://github.com/aws-amplify/amplify-ui/commit/2bda547aaffe9db7ffe460bf4028040a4b0a9566) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(liveness): add liveness version user agent to rekognition streaming api call

- Updated dependencies [[`3cecd0765`](https://github.com/aws-amplify/amplify-ui/commit/3cecd0765b46c77c49af24fae7cfb9054ebe2cdb)]:
  - @aws-amplify/ui@5.6.5
  - @aws-amplify/ui-react@5.0.2

## 1.0.3

### Patch Changes

- [#4103](https://github.com/aws-amplify/amplify-ui/pull/4103) [`6dee2da1f`](https://github.com/aws-amplify/amplify-ui/commit/6dee2da1fe711af1af3d21ea9eb64a2b4e2b3668) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(liveness): update progress bar to remove pin

- Updated dependencies [[`be856b057`](https://github.com/aws-amplify/amplify-ui/commit/be856b057750f9d2706c2a1e43c6ff1669e50a7b)]:
  - @aws-amplify/ui-react@5.0.1

## 1.0.2

### Patch Changes

- [#4070](https://github.com/aws-amplify/amplify-ui/pull/4070) [`88d153a88`](https://github.com/aws-amplify/amplify-ui/commit/88d153a884da968daf90a622e9c7afecdc817e79) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(liveness): add tslib@2.4.1 to react-liveness

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
