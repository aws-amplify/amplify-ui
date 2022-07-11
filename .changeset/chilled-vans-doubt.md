---
'@aws-amplify/ui': patch
---

Added user-select property to the amplify-input and the textArea scss. This will help Ionic apps that set this property to none. In Webkit/Chromium-based browsers this is inherite and is causing inputs on those browsers to not work correctly.
