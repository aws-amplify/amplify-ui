import { PasswordField, Text, useTheme } from '@aws-amplify/ui-react';

export const PasswordFieldStyledPropsExample = () => {
  const { tokens } = useTheme();
  return (
    <PasswordField
      direction="row"
      alignItems="baseline"
      label={
        <Text fontWeight="bold" fontSize={tokens.fontSizes.xl}>
          Password:
        </Text>
      }
      fontSize={tokens.fontSizes.xl}
      backgroundColor="#fff1e7"
      color="#000"
      width="400px"
    />
  );
};
