import React, { useEffect } from 'react';

import { Amplify, Notifications, Analytics } from 'aws-amplify';

import {
  Authenticator,
  InAppMessagingProvider,
  InAppMessageDisplay,
  Heading,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);
Notifications.configure(awsExports);
Analytics.configure(awsExports);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const { InAppMessaging } = Notifications;

const event = { name: '_session.start' };
console.log(event);

Analytics.record(event);

export default function App() {
  useEffect(() => {
    // Messages from your campaigns need to be synced from the backend before they
    // can be displayed. You can trigger this anywhere in your app. Here we are
    // syncing just once when this component (your app) renders for the first time.
    InAppMessaging.syncMessages();
  }, []);

  return (
    <InAppMessagingProvider>
      <Authenticator
        formFields={formFields}
        components={components}
        hideSignUp={true}
      >
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>

      <InAppMessageDisplay />
    </InAppMessagingProvider>
  );
}
