import { Button, Flex } from '@aws-amplify/ui-react';

export const OutlineVariation = () => {
  return (
    <Flex direction="column">
      <code>variation=&quot;outline&quot;</code>
      <Flex>
        <Button variation="outline">Brand</Button>
        <Button variation="outline" colorTheme="info">
          Info
        </Button>
        <Button variation="outline" colorTheme="warning">
          Warning
        </Button>
        <Button variation="outline" colorTheme="error">
          Primary
        </Button>
        <Button variation="outline" colorTheme="success">
          Success
        </Button>
        <Button variation="outline" colorTheme="neutral">
          Neutral
        </Button>
      </Flex>
    </Flex>
  );
};
