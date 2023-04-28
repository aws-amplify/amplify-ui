import { Button, Flex } from '@aws-amplify/ui-react';

export const PrimaryVariation = () => {
  return (
    <Flex>
      <Button variation="primary">Primary</Button>
      <Button variation="primary" colorTheme="info">
        Primary
      </Button>
    </Flex>
  );
};
