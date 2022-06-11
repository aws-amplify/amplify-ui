import { Text, useTheme } from '@aws-amplify/ui-react';

export const LocalStylingExample = () => {
  const theme = useTheme();
  return (
    <Text
      fontWeight={theme.tokens.fontWeights.bold}
      color={theme.tokens.colors.red[80]}
      textDecoration="underline"
      as="span"
    >
      This is my styled text
    </Text>
  );
};
