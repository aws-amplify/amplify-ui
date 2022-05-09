import { Flex, PasswordField } from '@aws-amplify/ui-react';

export const VariationExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <PasswordField label="Password" name="password" />
      <PasswordField label="Password" name="password" variation="quiet" />
    </Flex>
  );
};
