---
'@aws-amplify/ui-react': patch
---

Fix TOTP QR being incorrectly generated, as it was using an empty string as the secretKey
