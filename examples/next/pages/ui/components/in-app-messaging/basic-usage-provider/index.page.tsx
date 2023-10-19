import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  initializeInAppMessaging,
  syncMessages,
} from 'aws-amplify/in-app-messaging';
import { Text } from '@aws-amplify/ui-react';
import {
  InAppMessagingProvider,
  InAppMessageDisplay,
} from '@aws-amplify/ui-react-notifications';

import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

Amplify.configure(config);
initializeInAppMessaging();

function App() {
  useEffect(() => {
    // sync remote in-app messages
    syncMessages();
  }, []);

  return (
    <InAppMessagingProvider>
      <InAppMessageDisplay />
      <Text>In-App Messaging Example</Text>
    </InAppMessagingProvider>
  );
}

export default App;
