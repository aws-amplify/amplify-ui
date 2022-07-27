import { Text, TextField, useTheme } from '@aws-amplify/ui-react';

export const TextFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <TextField
      direction="row"
      alignItems="baseline"
      fontSize={tokens.fontSizes.xl}
      label={
        <Text
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.xl}
        >
          Name:
        </Text>
      }
      backgroundColor={tokens.colors.background.primary}
      color={tokens.colors.black}
    />
  );
};
