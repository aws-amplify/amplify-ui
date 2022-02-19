import { PasswordField, Text, useTheme } from '@aws-amplify/ui-react';

export const PasswordFieldStylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <PasswordField
      direction="row"
      alignItems="baseline"
      label={
        <Text fontWeight="bold" fontSize={tokens.fontSizes.large}>
          Password:
        </Text>
      }
      fontSize={tokens.fontSizes.large}
      backgroundColor={'#fff1e7'}
      color="#000"
      width="400px"
    />
  );
};
