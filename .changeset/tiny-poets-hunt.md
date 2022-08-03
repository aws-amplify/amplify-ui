---
"@aws-amplify/ui": minor
---

Add in _{state} design tokens for those that were still using names without the _
Add logic to createTheme to copy values from stateTokens without the _ to the state tokens with _
Filter out tokens marked with `deprecatedStateToken` flag.
