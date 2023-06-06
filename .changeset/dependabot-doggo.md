---
"@aws-amplify/ui-react": major
---

**Breaking Changes**: 

- `@aws-amplify/ui-react@5.x` remove the `to` prop on `Link` component and instead have it extended from the underlying rendered third-party `Link` if it contains a `to` prop. #4011

- `@aws-amplify/ui-react@5.x` strictly types the `View` component and updates all component types to include the underlying rendered HTML element's attributes. #4011
