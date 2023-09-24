import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Notifications } from '@aws-amplify/notifications';
import { Text } from '@aws-amplify/ui-react';
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

const { InAppMessaging } = Notifications;

Amplify.configure(config);

function App() {
  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
  }, []);

  return <Text>In-App Messaging Example</Text>;
}

export default withInAppMessaging(App);
