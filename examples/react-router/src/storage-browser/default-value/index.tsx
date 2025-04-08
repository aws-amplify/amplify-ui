import { StorageBrowser } from '../storage-browser'; // import first, not included in docs example
import { useParams } from 'react-router-dom';

export default function App() {
  const { value } = useParams<{ value: string }>();

  return <StorageBrowser defaultValue={value ? JSON.parse(value) : null} />;
}
