import { StorageBrowser } from '../storage-browser'; // import first, not included in docs example
import { useParams } from 'react-router-dom';

import { StorageBrowserValue } from '@aws-amplify/ui-react-storage/browser';

export default function App() {
  const { value } = useParams<{ value: string }>();

  const defaultValue: StorageBrowserValue | null = value
    ? JSON.parse(value)
    : null;

  return <StorageBrowser defaultValue={defaultValue} />;
}
