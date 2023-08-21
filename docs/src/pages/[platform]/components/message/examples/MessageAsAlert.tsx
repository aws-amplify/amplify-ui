import { Flex, Button, Message } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const MessageAsAlert = () => {
  const [alertActive, setAlertActive] = useState(false);
  return (
    <Flex direction="column">
      <Button onClick={() => setAlertActive(!alertActive)}>Toggle Alert</Button>
      {alertActive ? (
        <Message
          role="alert"
          heading="Alert"
          colorTheme="error"
          content="This is the alert content."
        />
      ) : null}
    </Flex>
  );
};
