import React, { useCallback, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  Button,
  InAppMessageDisplay,
  useInAppMessaging,
  withInAppMessaging,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import config from './aws-exports';

Amplify.configure(config);

const CustomModalMessage = (props) => (
  <InAppMessageDisplay.ModalMessage
    {...props}
    style={{ container: { backgroundColor: 'antiquewhite' } }}
  />
);

function App() {
  const { displayMessage } = useInAppMessaging();

  const displayCustomModalMessage = useCallback(
    () =>
      displayMessage({
        content: [{ header: { content: 'Hello World!' } }],
        id: 'custom message',
        layout: 'MODAL',
      }),
    [displayMessage]
  );

  // display message component on initial render
  useEffect(displayCustomModalMessage, [displayCustomModalMessage]);

  return (
    <Button margin="medium" onClick={displayCustomModalMessage}>
      Display Custom Modal Message
    </Button>
  );
}

export default withInAppMessaging(App, {
  components: { ModalMessage: CustomModalMessage },
});
