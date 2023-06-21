import { Button, Flex } from '@aws-amplify/ui-react';

export const LinkVariation = () => {
  return (
    <Flex>
      <Button variation="link">brand</Button>
      <Button variation="link" colorTheme="info">
        info
      </Button>
      <Button variation="link" colorTheme="warning">
        warning
      </Button>
      <Button variation="link" colorTheme="error">
        error
      </Button>
      <Button variation="link" colorTheme="success">
        success
      </Button>
      <Button variation="link" colorTheme="overlay">
        overlay
      </Button>
    </Flex>
  );
};
