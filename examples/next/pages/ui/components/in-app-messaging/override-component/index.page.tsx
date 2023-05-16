import React, { useCallback, useEffect } from 'react';
import { Amplify, Notifications } from 'aws-amplify';
import {
  Button,
  Flex,
  Text,
  useInAppMessaging,
  withInAppMessaging,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

const { InAppMessaging } = Notifications;

Amplify.configure(config);

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

  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
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
