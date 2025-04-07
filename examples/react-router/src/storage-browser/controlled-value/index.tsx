import { StorageBrowser } from '../storage-browser'; // import first, not included in docs example
import { useSearchParams } from 'react-router-dom';

import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

export default function App() {
  const [params, setParams] = useSearchParams({
    value: JSON.stringify({}),
  });

  const value = params.get('value');

  const handleValueChange = (nextValue: StorageBrowserEventValue) => {
    setParams((prev) => {
      prev.set('value', JSON.stringify(nextValue));

      return prev;
    });
  };

  return (
    <StorageBrowser
      onValueChange={handleValueChange}
      value={value ? JSON.parse(value) : null}
    />
  );
}
