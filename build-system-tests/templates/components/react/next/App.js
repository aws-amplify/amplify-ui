import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { syncMessages } from 'aws-amplify/in-app-messaging';
import { AccountSettings, Authenticator, Text } from '@aws-amplify/ui-react';
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

export default function Home() {
  useEffect(() => {
    // sync remote in-app messages
    syncMessages();
  }, []);

  return (
    <>
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
