import { Button, Flex } from '@aws-amplify/ui-react';

export const LinkVariation = () => {
  return (
    <Flex>
      <Button variation="link">Default link</Button>
      <Button variation="link" colorTheme="info">
        Info link
      </Button>
      <Button variation="link" colorTheme="warning">
        Warning link
      </Button>
      <Button variation="link" colorTheme="error">
        Error link
      </Button>
      <Button variation="link" colorTheme="success">
        Success link
      </Button>
      <Button variation="link" colorTheme="neutral">
        Success link
      </Button>
    </Flex>
  );
};
