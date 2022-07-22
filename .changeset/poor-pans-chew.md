---
"@aws-amplify/ui-react": patch
---

ui-react(fix): Update ShowPasswordButton to use role=“switch” and add additional SR context

As a screen reader user, I want the Show Password button to announce its current context, so that I know when it is toggled or not.

- ShowPasswordButton should use role=“switch” and have an accompanying aria-checked state.
- Keep consistent aria-label “Show password”. Remove the unnecessary “Hide password” label/translation.
- Add additional screen reader only context to shared/i18n.ts for “checked” states: “Password is shown”, “Password is hidden”
- Add a visually hidden aria-live region (polite) that updates based on the ShowPasswordButton checked state using our new context (see previous item).
