import { Button, Flex } from '@aws-amplify/ui-react';

export const PrimaryVariation = () => {
  return (
    <Flex direction="column">
      <code>variation=&quot;primary&quot;</code>
      <Flex>
        <Button variation="primary">Brand</Button>
        <Button variation="primary" colorTheme="info">
          Info
        </Button>
        <Button variation="primary" colorTheme="warning">
          Warning
        </Button>
        <Button variation="primary" colorTheme="error">
          Primary
        </Button>
        <Button variation="primary" colorTheme="success">
          Success
        </Button>
        <Button variation="primary" colorTheme="neutral">
          Neutral
        </Button>
      </Flex>
    </Flex>
  );
};
