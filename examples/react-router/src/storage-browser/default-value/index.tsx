import { useParams } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';

import outputs from '@aws-amplify/ui-environments/storage/gen2/amplify_outputs.json';

Amplify.configure(outputs);

export default function App() {
  const { location, path } = useParams<{ location: string; path: string }>();

  return (
    <StorageBrowser
      location={location ? JSON.parse(location) : null}
      path={path ?? undefined}
    />
  );
}
