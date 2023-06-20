import { Button, Flex } from '@aws-amplify/ui-react';

export const OutlineVariation = () => {
  return (
    <Flex>
      <Button>brand</Button>
      <Button colorTheme="info">info</Button>
      <Button colorTheme="warning">warning</Button>
      <Button colorTheme="error">error</Button>
      <Button colorTheme="success">success</Button>
      <Button colorTheme="neutral">neutral</Button>
    </Flex>
  );
};
