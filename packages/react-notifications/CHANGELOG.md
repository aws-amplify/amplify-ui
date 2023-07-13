# @aws-amplify/ui-react-notifications

## 1.0.5

### Patch Changes

- Updated dependencies [[`572730f7b`](https://github.com/aws-amplify/amplify-ui/commit/572730f7b16b87a6b2ab0c40116a4c8c5acdbd36)]:
  - @aws-amplify/ui-react@5.0.4

## 1.0.4

### Patch Changes

- Updated dependencies [[`b0e16e78c`](https://github.com/aws-amplify/amplify-ui/commit/b0e16e78c6a41945aa79f3e14fa3f9e6cb0e5e76), [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118)]:
  - @aws-amplify/ui-react@5.0.3
  - @aws-amplify/ui@5.6.6
  - @aws-amplify/ui-react-core-notifications@1.0.2

## 1.0.3

### Patch Changes

- Updated dependencies [[`3cecd0765`](https://github.com/aws-amplify/amplify-ui/commit/3cecd0765b46c77c49af24fae7cfb9054ebe2cdb)]:
  - @aws-amplify/ui@5.6.5
  - @aws-amplify/ui-react@5.0.2
  - @aws-amplify/ui-react-core-notifications@1.0.1

## 1.0.2

### Patch Changes

- Updated dependencies [[`be856b057`](https://github.com/aws-amplify/amplify-ui/commit/be856b057750f9d2706c2a1e43c6ff1669e50a7b)]:
  - @aws-amplify/ui-react@5.0.1

## 1.0.1

### Patch Changes

- [#4048](https://github.com/aws-amplify/amplify-ui/pull/4048) [`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83) Thanks [@calebpollman](https://github.com/calebpollman)! - **Breaking Changes**:

  - `@aws-amplify/ui-react@5.x` removes the `to` prop on `Link` component and instead have it extended from the underlying rendered third-party `Link` if it contains a `to` prop ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).

  - `@aws-amplify/ui-react@5.x` strictly types the `View` component and updates all component types to include the underlying rendered HTML element's attributes ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).

- Updated dependencies [[`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83)]:
  - @aws-amplify/ui-react@5.0.0

## 1.0.0

### Major Changes

- [#3901](https://github.com/aws-amplify/amplify-ui/pull/3901) [`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776) Thanks [@sreeramsama](https://github.com/sreeramsama)! - - Adds new `ui-react-core-notifications` package for utilities related to the Notifications category, and new `ui-react-notifications` package for components like InAppMessaging. Also sets deprecation messages for `InAppMessagingDisplay`, `InAppMessagingProvider` and `useInAppMessaging` in `ui-react` package as they will be moved out in a future breaking change release.
  - Adds new `ui-react-geo` package for Geo related components like `MapView` and `LocationSearch`. They will be moved out from `ui-react` in a future breaking change release.

### Patch Changes

- Updated dependencies [[`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776), [`ca591a2fc`](https://github.com/aws-amplify/amplify-ui/commit/ca591a2fc319556f705be74bacd141d48f3531bd)]:
  - @aws-amplify/ui-react-core-notifications@1.0.0
  - @aws-amplify/ui-react@4.6.4
  - @aws-amplify/ui@5.6.4
