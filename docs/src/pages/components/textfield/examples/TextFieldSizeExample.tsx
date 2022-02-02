import { Button, Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldSizeExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <Flex>
        <TextField label="Small" size="small" labelHidden />
        <Button size="small">Small</Button>
      </Flex>
      <Flex>
        <TextField label="Default" labelHidden />
        <Button>Default</Button>
      </Flex>
      <Flex>
        <TextField label="Large" size="large" labelHidden />
        <Button size="large">Large</Button>
      </Flex>
    </Flex>
  );
};
