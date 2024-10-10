import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  initializeInAppMessaging,
  syncMessages,
} from 'aws-amplify/in-app-messaging';
import { AccountSettings, Authenticator, Text } from '@aws-amplify/ui-react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { StorageManager, FileUploader } from '@aws-amplify/ui-react-storage';
import {
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react-notifications';
import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';
import awsconfig from '../../../environments/auth-with-email/src/aws-exports.js';
Amplify.configure(awsconfig);

initializeInAppMessaging();

export default function Home() {
  useEffect(() => {
    // sync remote in-app messages
    syncMessages();
  }, []);

  return (
    <>
      <FaceLivenessDetector
        sessionId="123"
        region="us-east-1"
        onAnalysisComplete={async () => {}}
      />
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Text>In-App Messaging Example</Text>
      </InAppMessagingProvider>
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
        accessLevel="guest"
        maxFileCount={1}
        isResumable
      />
      <StorageManager
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={1}
        isResumable
      />
      <FileUploader
        acceptedFileTypes={['image/*']}
        accessLevel="guest"
        maxFileCount={1}
        isResumable
      />
      <FileUploader
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={1}
        isResumable
      />
      <MapView
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14,
        }}
      >
        <LocationSearch />
      </MapView>
    </>
  );
}
