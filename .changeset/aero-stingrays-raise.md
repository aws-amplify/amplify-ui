---
"@aws-amplify/ui-react": patch
---

Adds optional `selector` parameter to `useAuthenticator`. This specifies which context should trigger to re-render. For example,

```tsx
const user = useAuthenticator(context => context.user)
```

will only trigger re-render when the `user` changes.

We can also compose multiple context:

```tsx
const { user, route } = useAuthenticator(context => ({ user: context.user, route: context.route }))
```

will only trigger re-render when either `user` or `route` change.
