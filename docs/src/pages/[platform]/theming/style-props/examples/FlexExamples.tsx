import { Button, Flex } from '@aws-amplify/ui-react';

// use any CSS value
export const FlexStylePropExample = () => {
  return (
    <Flex direction="column" wrap="wrap" alignItems="flex-start">
      <Button order="3">Button 1</Button>
      <Button order="1">Button 2</Button>
      <Button order="2">Button 3</Button>
    </Flex>
  );
};
