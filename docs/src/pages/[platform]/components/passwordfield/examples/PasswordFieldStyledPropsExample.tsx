import { PasswordField, Text, useTheme } from '@aws-amplify/ui-react';

export const PasswordFieldStyledPropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <PasswordField
        label={
          <Text fontWeight="bold" fontSize={tokens.fontSizes.xl}>
            Password:
          </Text>
        }
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <PasswordField
        label="Password"
        inputStyles={{
          backgroundColor: 'brand.primary.10',
        }}
      />
    </>
  );
};
