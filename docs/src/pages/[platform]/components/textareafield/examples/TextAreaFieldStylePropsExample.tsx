import { Text, TextAreaField, useTheme } from '@aws-amplify/ui-react';

export const TextAreaFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <TextAreaField
      direction="row"
      alignItems="baseline"
      fontSize={tokens.fontSizes.xl}
      label={
        <Text
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.xl}
        >
          Address:
        </Text>
      }
      backgroundColor={tokens.colors.background.secondary}
      color={tokens.colors.black}
      width="400px"
    />
  );
};
