import React, { useCallback, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  syncMessages,
  initializeInAppMessaging,
} from 'aws-amplify/in-app-messaging';
import { Text } from '@aws-amplify/ui-react';
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

console.log(config.aws_cognito_identity_pool_id);
Amplify.configure(config);
console.log('after');
initializeInAppMessaging();

function App() {
  const syncMessagesCallback = useCallback(async () => {
    await syncMessages();
  }, []);

  useEffect(() => {
    // sync remote in-app messages
    syncMessagesCallback();
  }, []);

  return <Text>In-App Messaging Example</Text>;
}

export default withInAppMessaging(App);
