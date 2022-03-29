---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

build: setting up Rollup for bundling

Both `@aws-amplify/ui-react` and `@aws-amplify/ui` cannot be tree shaken before because we bundle it in a wrong way. With `preserveModule` in Rollup, we make them tree-shakeble friendly.

With webpack, we can see tree shaking is taking effect now

```jsx
// index.tsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import '@aws-amplify/ui-react/styles.css';

import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// App.tsx
import * as React from 'react';
import { Loader } from '@aws-amplify/ui-react';

export const App = () => {
  return <Loader />;
};
```
main.js size
| Before     | After |
| ----------- | ----------- |
|   1.7M   | 161.1k      |
