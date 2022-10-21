---
"@aws-amplify/ui-react": major
---

BREAKING CHANGE: Remove legacy exports. You will no longer be able to import from `@aws-amplify/ui-react/legacy`:

```js
// Removed:
export {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
  AmplifyChatbot,
  AmplifyPhotoPicker,
  AmplifyPicker,
  AmplifyS3Album,
  AmplifyS3Image,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  withAuthenticator,
} from '@aws-amplify/ui-react-v1';
```
