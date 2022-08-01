---
"@aws-amplify/ui-react": patch
---

fix(ui-react): remove role="alert" from Alert

The Alert component should not have the ARIA alert role by default. To create an Alert with the alert role, pass it down as a role attribute:
```
<Alert role="alert">This is an ARIA alert</Alert>
```
Learn more about [using the alert role)(https://ui.docs.amplify.aws/react/components/alert#accessibility) on our docs and the [W3's spec for the alert role](https://w3c.github.io/aria/#alert)
