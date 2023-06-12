import { Button, Flex } from '@aws-amplify/ui-react';

export const LinkVariation = () => {
  return (
    <Flex direction="column">
      <code>variation=&quot;link&quot;</code>
      <Flex>
        <Button variation="link">Brand</Button>
        <Button variation="link" colorTheme="info">
          Info
        </Button>
        <Button variation="link" colorTheme="warning">
          Warning
        </Button>
        <Button variation="link" colorTheme="error">
          Primary
        </Button>
        <Button variation="link" colorTheme="success">
          Success
        </Button>
        <Button variation="link" colorTheme="neutral">
          Neutral
        </Button>
      </Flex>
    </Flex>
  );
};
