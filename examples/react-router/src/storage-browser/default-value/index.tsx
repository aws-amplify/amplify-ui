import { useParams } from 'react-router-dom';

import { StorageBrowser } from '../storage-browser';

export default function App() {
  const { value } = useParams<{ value: string }>();

  return <StorageBrowser defaultValue={value ? JSON.parse(value) : {}} />;
}
