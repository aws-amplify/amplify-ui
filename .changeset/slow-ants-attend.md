---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

feat: add CSS layers support and CSS file splitting. The default style import '@aws-amplify/ui-react/styles.css' remains unchanged so these features are opt-in.
We are now exposing each different component CSS file if you want fine-grained control over what CSS is loaded. Additionally, we will have a CSS reset and a base CSS file.
If you only wanted the button CSS you could do this:

```javascript
import '@aws-amplify/ui-react/styles/reset.css'
import '@aws-amplify/ui-react/styles/base.css'
import '@aws-amplify/ui-react/styles/button.css'
```

You can also use the main 'styles.css' import with the new reset file too. 

To use CSS layers, replace '.css' with '.layer.css' for any CSS import.

```diff
- import '@aws-amplify/ui-react/styles.css'
+ import '@aws-amplify/ui-react/styles.layer.css'
```
