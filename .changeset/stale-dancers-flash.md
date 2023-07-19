---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

feat(ui-react-storage): Add a new connected component `StorageImage`. It allows you load the images managed by Amplify Storage.

*Example:*
```jsx
import { StorageImage } from '@aws-amplify/ui-react-storage';

<StorageImage alt="StorageImage" imgKey="image.jpg" accessLevel="public" />
```
