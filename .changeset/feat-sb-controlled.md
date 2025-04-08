---
'@aws-amplify/ui': patch
'@aws-amplify/ui-react-core': patch
'@aws-amplify/ui-react-storage': minor
---

feat(storage-browser): add defaultValue, value, and onValueChange props

**Controlled `StorageBrowser`**

```tsx
'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const value = params.get('value');

  const handleValueChange = React.useCallback(
    (nextValue: StorageBrowserEventValue) => {
      const nextParams = new URLSearchParams();
      nextParams.set('value', JSON.stringify(nextValue));

      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router]
  );

  return (
    <StorageBrowser
      onValueChange={handleValueChange}
      value={value ? JSON.parse(value) : null}
    />
  );
}
```

**Initialize with `defaultValue`**

```tsx
'use client';

import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();

  const value = params.get('value');

  return <StorageBrowser defaultValue={value ? JSON.parse(value) : null} />;
}
```