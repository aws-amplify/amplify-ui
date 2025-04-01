import { useParams } from 'react-router-dom';

import { StorageBrowser } from '../storage-browser';

export default function App() {
  const { value } = useParams<{ value: string }>();

  return (
    // @ts-expect-error to be updated
    <StorageBrowser defaultValue={value ? JSON.parse(value) : {}} />
  );
}
