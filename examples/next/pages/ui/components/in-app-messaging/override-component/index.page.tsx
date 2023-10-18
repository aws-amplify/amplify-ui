import React, { useCallback, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  initializeInAppMessaging,
  syncMessages,
} from 'aws-amplify/in-app-messaging';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import {
  useInAppMessaging,
  withInAppMessaging,
} from '@aws-amplify/ui-react-notifications';

import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

Amplify.configure(config);
initializeInAppMessaging();

const CustomBannerMessage = (props) => {
  return (
    <Flex
      alignItems="center"
      borderRadius="xs"
      position="absolute"
      padding="xl"
      backgroundColor="teal.20"
      right="xl"
      testId="custom-banner"
    >
      <Text fontWeight="bold">{props.header.content}</Text>
      <Button onClick={props.onClose}>Close!</Button>
    </Flex>
  );
};

function App() {
  const { displayMessage } = useInAppMessaging();

  const syncMessagesCallback = useCallback(async () => {
    await syncMessages();
  }, []);

  useEffect(() => {
    // sync remote in-app messages
    syncMessagesCallback();
  }, []);

  const displayCustomBannerMessage = useCallback(
    () =>
      displayMessage({
        content: [{ header: { content: 'Hello World!' } }],
        id: 'Custom message',
        layout: 'TOP_BANNER',
      }),
    [displayMessage]
  );

  // display custom message component on initial render
  useEffect(displayCustomBannerMessage, [displayCustomBannerMessage]);

  return (
    <Button margin="medium" onClick={displayCustomBannerMessage}>
      Display Custom Banner Message
    </Button>
  );
}

export default withInAppMessaging(App, {
  components: { BannerMessage: CustomBannerMessage },
});
