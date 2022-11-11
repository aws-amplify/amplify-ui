import React, { useCallback, useEffect } from 'react';
import { Amplify, Notifications } from 'aws-amplify';
import {
  Button,
  InAppMessageDisplay,
  useInAppMessaging,
  withInAppMessaging,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

const { InAppMessaging } = Notifications;

Amplify.configure(config);

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
    InAppMessaging.syncMessages();
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
