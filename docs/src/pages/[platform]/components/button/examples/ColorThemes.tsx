import * as React from 'react';
import { Button, Flex } from '@aws-amplify/ui-react';

export const ColorThemes = () => {
  return (
    <Flex direction="column" gap="medium">
      <Flex>
        <Button>default</Button>
        <Button colorTheme="info">info</Button>
        <Button colorTheme="success">success</Button>
        <Button colorTheme="error">error</Button>
        <Button colorTheme="warning">warning</Button>
      </Flex>
      <Flex>
        <Button variation="primary">default</Button>
        <Button variation="primary" colorTheme="info">
          info
        </Button>
        <Button variation="primary" colorTheme="success">
          success
        </Button>
        <Button variation="primary" colorTheme="error">
          error
        </Button>
        <Button variation="primary" colorTheme="warning">
          warning
        </Button>
      </Flex>
      <Flex>
        <Button variation="link">default</Button>
        <Button variation="link" colorTheme="info">
          info
        </Button>
        <Button variation="link" colorTheme="success">
          success
        </Button>
        <Button variation="link" colorTheme="error">
          error
        </Button>
        <Button variation="link" colorTheme="warning">
          warning
        </Button>
      </Flex>
    </Flex>
  );
};
