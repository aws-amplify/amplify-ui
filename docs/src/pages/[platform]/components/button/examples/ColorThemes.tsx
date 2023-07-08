import * as React from 'react';
import { Button, Flex } from '@aws-amplify/ui-react';

export const IconButtonExample = () => {
  return (
    <Flex direction="column" gap="medium">
      <Flex>
        <Button>default</Button>
        <Button>info</Button>
        <Button>success</Button>
        <Button>error</Button>
        <Button>war</Button>
      </Flex>
      <Button></Button>
    </Flex>
  );
};
