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
      padding={tokens.space.large}
      backgroundColor={tokens.colors.brand.primary[80]}
      color={tokens.colors.font.inverse}
      width="400px"
    />
  );
};
