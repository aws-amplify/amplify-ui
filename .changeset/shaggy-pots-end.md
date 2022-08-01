---
"@aws-amplify/ui-react": patch
---

fix(ui-react): move `role="alert"` to parent element of Alert to allow for role overrides.

The Alert component currently has the ARIA `alert` role by default. This change allows us to override the role when the `alert` role does not match the use case.
```
<Alert role="none">This is no longer an ARIA alert</Alert>
```
Learn more about [using the alert role)(https://ui.docs.amplify.aws/react/components/alert#accessibility) on our docs and the [W3's spec for the alert role](https://w3c.github.io/aria/#alert)
