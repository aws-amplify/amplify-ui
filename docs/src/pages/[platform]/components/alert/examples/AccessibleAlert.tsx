import { Flex, Button, Alert } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const AccessibleAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <Flex direction="column">
      <Button onClick={() => setIsAlertVisible(!isAlertVisible)}>
        Toggle Alert
      </Button>
      {isAlertVisible ? (
        <Alert variation="error">This is an example alert.</Alert>
      ) : null}
    </Flex>
  );
};
