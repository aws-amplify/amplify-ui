---
'@aws-amplify/ui': patch
---

Added user-select property to 'text' for the amplify-input and the textArea primitives. This will help Ionic apps that set this property to none. In Webkit/Chromium-based browsers this is inherited and is causing inputs on those browsers to not work correctly.
