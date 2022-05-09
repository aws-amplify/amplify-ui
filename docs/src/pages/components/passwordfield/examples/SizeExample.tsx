import { Flex, PasswordField } from '@aws-amplify/ui-react';

export const SizeExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <PasswordField label="Password" name="password" size="small" />
      <PasswordField label="Password" name="password" />
      <PasswordField label="Password" name="password" size="large" />
    </Flex>
  );
};
