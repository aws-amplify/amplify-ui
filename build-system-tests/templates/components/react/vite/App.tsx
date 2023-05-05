import { useEffect } from 'react';
import { Amplify, Notifications } from 'aws-amplify';
import {
  AccountSettings,
  Authenticator,
  FileUploader,
  MapView,
  Text,
  InAppMessagingProvider,
  InAppMessageDisplay,
} from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const { InAppMessaging } = Notifications;

export default function Home() {
  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
  }, []);

  return (
    <>
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Text>In-App Messaging Example</Text>
      </InAppMessagingProvider>
      <FileUploader acceptedFileTypes={['image/*']} accessLevel="public" />
      <Authenticator>
        {({ signOut, user = { username: '' } }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
      <AccountSettings.ChangePassword onSuccess={() => {}} />
      <AccountSettings.DeleteUser onSuccess={() => {}} />
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        isResumable
      />
      <MapView />
    </>
  );
}
