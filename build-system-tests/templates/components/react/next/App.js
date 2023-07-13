import React, { useEffect } from 'react';
import { Amplify, Notifications } from 'aws-amplify';
import {
  AccountSettings,
  Authenticator,
  FileUploader,
  Text,
} from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import {
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react-notifications';
import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-geo/styles.css';
import awsconfig from '@/data/aws-exports';
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
