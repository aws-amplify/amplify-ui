import { PasswordField, useTheme } from '@aws-amplify/ui-react';

export const PasswordFieldInputStyleExample = () => {
  const { tokens } = useTheme();

  return (
    <PasswordField
      label="Name"
      inputStyles={{
        backgroundColor: tokens.colors.background.warning,
        padding: tokens.space.large,
      }}
    />
  );
};
