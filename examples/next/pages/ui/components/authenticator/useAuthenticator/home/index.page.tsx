import { useAuthenticator } from '@aws-amplify/ui-react';

export default function App() {
  const { user } = useAuthenticator();

  return (
    <>
      <div>Welcome, {user?.username}</div>
    </>
  );
}
