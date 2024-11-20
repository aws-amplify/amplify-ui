---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": minor
"@aws-amplify/ui-react-core": minor
"@aws-amplify/ui": minor
---

feat(storage-browser): add `StorageBrowser` and `createStorageBrowser`

```tsx
import { Amplify } from 'aws-amplify';

import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

Amplify.configure(config);

function App() {
  return <StorageBrowser />
}
```

```tsx
import { Amplify } from 'aws-amplify';

import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

function App() {
  return <StorageBrowser />
}
```