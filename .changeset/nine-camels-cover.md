---
"@aws-amplify/ui-react": patch
---

fix: Authenticator issue where InitMachine useEffect runs every render, causing `children` of `Authenticator` to be unmounted and remounted on every render.
