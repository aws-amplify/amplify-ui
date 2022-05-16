import { PasswordField, Text, useTheme } from '@aws-amplify/ui-react';

export const DescriptiveTextExample = () => {
  const { tokens } = useTheme();
  return (
    <PasswordField
      label="Password"
      name="password"
      descriptiveText={
        <Text
          as="span"
          color="rebeccapurple"
          fontStyle="italic"
          fontSize={tokens.fontSizes.small}
        >
          Password length must be greater than 8 characters
        </Text>
      }
    />
  );
};
