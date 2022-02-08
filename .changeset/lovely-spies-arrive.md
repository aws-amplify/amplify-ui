---
"@aws-amplify/ui-react": minor
---

Adding more flexibility in the Icon component. Added `as` and `children` to the Icon props to allow for more complex icons. 

Using `as` prop with icon libraries:

```jsx
import { Icon } from '@aws-amplify/ui-react';
import { DiJsBadge } from 'react-icons/di';

<Icon ariaLabel="Javascript" as={DiJsBadge} />
```

Using multiple paths:

```jsx
import { Icon } from '@aws-amplify/ui-react';

<Icon ariaLabel="Align bottom" color="rebeccapurple">
  <path d="M13 10H17V16H13V10Z" fill="currentColor" opacity="0.5" />
  <path d="M11 4H7V16H11V4Z" fill="currentColor" />
  <path d="M18 18H6V20H18V18Z" fill="currentColor" />
</Icon>
```
