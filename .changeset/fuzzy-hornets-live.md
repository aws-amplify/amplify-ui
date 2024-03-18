---
"@aws-amplify/ui-react-liveness": patch
"@aws-amplify/ui-react": patch
---

chore(Liveness): update face match algorithm. Removes `TOO_CLOSE` face match state, so "Move back" text can only appear *before* recording. Once recording, user will not be prompted to move back.
