---
"docs": patch
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

feat: adding determinate loader support

***Example:***

To use determinate loader, set `isDeterminate` to `true` and pass `percentage`

```jsx
import * as React from 'react';
import { Loader } from '@aws-amplify/ui-react';

export const DeterminateLoaderExample = () => {
  const [percentage, setPercentage] = React.useState(0);
  React.useEffect(() => {
    const clearID = setInterval(() => {
      setPercentage((percentage) => {
        if (percentage < 100) {
          return percentage + 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(clearID);
  }, []);
  return (
    <>
      <Loader percentage={percentage} isDeterminate />
      <Loader variation="linear" percentage={percentage} isDeterminate />
    </>
  );
};
```

To hide the percentage text, set `isPercentageTextHidden` to `true`

```jsx
import { Loader } from '@aws-amplify/ui-react';

export const LoaderIsPercentageTextHiddenExample = () => {
  return <Loader percentage={60} isDeterminate isPercentageTextHidden />;
};
```
