import { Flex, PasswordField, useTheme } from '@aws-amplify/ui-react';

export const VariationExample = () => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column" gap={tokens.space.medium}>
      <PasswordField label="Password" name="password" />
      <PasswordField label="Password" name="password" variation="quiet" />
    </Flex>
  );
};
