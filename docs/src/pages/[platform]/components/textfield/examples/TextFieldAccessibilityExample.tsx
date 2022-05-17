import { Button, Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldAccessibilityExample = () => {
  return (
    <Flex>
      <TextField label="Search" labelHidden={true} />
      <Button>Search</Button>
    </Flex>
  );
};
