import { Button, Flex, PasswordField } from '@aws-amplify/ui-react';

export const PasswordFieldSizeExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <Flex>
        <PasswordField label="Small" size="small" labelHidden />
        <Button size="small">Small</Button>
      </Flex>
      <Flex>
        <PasswordField label="Default" labelHidden />
        <Button>Default</Button>
      </Flex>
      <Flex>
        <PasswordField label="Large" size="large" labelHidden />
        <Button size="large">Large</Button>
      </Flex>
    </Flex>
  );
};
