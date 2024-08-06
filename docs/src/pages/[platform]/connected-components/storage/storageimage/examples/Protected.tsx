import { StorageImage } from '@aws-amplify/ui-react-storage';

export function App() {
  return (
    <StorageImage
      alt="protected cat"
      path={({ identityId }) => `protected/${identityId}/cat.jpg`}
    />
  );
}
