import { Button, Flex } from '@aws-amplify/ui-react';

export const OutlineVariation = () => {
  return (
    <Flex direction="column">
      <code>variation=&quot;outline&quot;</code>
      <Flex>
        <Button variation="outlined">Brand</Button>
        <Button variation="outlined" colorTheme="info">
          Info
        </Button>
        <Button variation="outlined" colorTheme="warning">
          Warning
        </Button>
        <Button variation="outlined" colorTheme="error">
          Primary
        </Button>
        <Button variation="outlined" colorTheme="success">
          Success
        </Button>
        <Button variation="outlined" colorTheme="neutral">
          Neutral
        </Button>
      </Flex>
    </Flex>
  );
};
