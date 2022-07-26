---
"@aws-amplify/ui-react": patch
---

ui-react(fix): Update ShowPasswordButton to use role=“switch” and add additional screen reader context

- Keep consistent aria-label “Show password”
- Add a visually hidden aria-live region (polite) that updates based on the ShowPasswordButton checked state
- Add `passwordIsHiddenLabel` and `passwordIsShownLabel` props for screen readers
