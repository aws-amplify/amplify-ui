import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

import { StorageBrowser } from '../storage-browser';

export default function App() {
  const [params, setParams] = useSearchParams({
    value: JSON.stringify({}),
  });

  const value = params.get('value');

  const handleValueChange = useCallback(
    (nextValue: StorageBrowserEventValue) => {
      setParams((prev) => {
        prev.set('value', JSON.stringify(nextValue));

        return prev;
      });
    },
    [setParams]
  );

  return (
    <StorageBrowser
      onValueChange={handleValueChange}
      value={value ? JSON.parse(value) : null}
    />
  );
}
