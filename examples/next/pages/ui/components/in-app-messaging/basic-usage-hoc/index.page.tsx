import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  initializeInAppMessaging,
  syncMessages,
} from 'aws-amplify/in-app-messaging';
import { Text } from '@aws-amplify/ui-react';
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(
    `@environments/in-app-messaging/in-app-messaging-with-pinpoint-campaign/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);

initializeInAppMessaging();

function App() {
  useEffect(() => {
    // sync remote in-app messages
    syncMessages();
  }, []);

  return <Text>In-App Messaging Example</Text>;
}

export default withInAppMessaging(App);
