---
"@aws-amplify/ui-react": major
"@aws-amplify/ui-react-liveness": patch
"@aws-amplify/ui-react-notifications": patch
---

**Breaking Changes**: 

- `@aws-amplify/ui-react@5.x` removes the `to` prop on `Link` component and instead have it extended from the underlying rendered third-party `Link` if it contains a `to` prop ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).

- `@aws-amplify/ui-react@5.x` strictly types the `View` component and updates all component types to include the underlying rendered HTML element's attributes ([PR](https://github.com/aws-amplify/amplify-ui/pull/4011)).
