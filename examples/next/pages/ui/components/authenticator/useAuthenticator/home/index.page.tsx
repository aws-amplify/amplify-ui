import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';

Amplify.configure(awsExports);

export default function App() {
  const { user } = useAuthenticator();

  return (
    <>
      <div>Welcome, {user?.username}</div>
    </>
  );
}
