import React, { useCallback, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  initializeInAppMessaging,
  syncMessages,
} from 'aws-amplify/in-app-messaging';
import { Button } from '@aws-amplify/ui-react';
import {
  InAppMessageDisplay,
  useInAppMessaging,
  withInAppMessaging,
} from '@aws-amplify/ui-react-notifications';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(
    `@environments/in-app-messaging/in-app-messaging-with-pinpoint-campaign/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);
initializeInAppMessaging();

const StyledModalMessage = (props) => (
  <InAppMessageDisplay.ModalMessage
    {...props}
    style={{ container: { backgroundColor: 'antiquewhite' } }}
  />
);

function App() {
  const { displayMessage } = useInAppMessaging();

  useEffect(() => {
    // sync remote in-app messages
    syncMessages();
  }, []);

  const displayStyledModalMessage = useCallback(
    () =>
      displayMessage({
        content: [{ header: { content: 'Hello World!' } }],
        id: 'styled message',
        layout: 'MODAL',
      }),
    [displayMessage]
  );

  // display message component on initial render
  useEffect(displayStyledModalMessage, [displayStyledModalMessage]);

  return (
    <Button margin="medium" onClick={displayStyledModalMessage}>
      Display Custom Modal Message
    </Button>
  );
}

export default withInAppMessaging(App, {
  components: { ModalMessage: StyledModalMessage },
});
