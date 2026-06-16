---
'@aws-amplify/ui-react-liveness': patch
'@aws-amplify/ui-react': patch
---

Fix Metro warnings by explicitly exporting dist CSS entrypoints in package.json. Added `./dist/styles.css` export aliases to prevent Metro from implicitly falling back to file-based resolution.
