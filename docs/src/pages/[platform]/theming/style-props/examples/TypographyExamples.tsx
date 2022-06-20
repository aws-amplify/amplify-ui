import { Text, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const TypographyStylePropExample = () => {
  return (
    <Text fontSize="2rem" fontWeight="600" lineHeight="1.5">
      Typography Styling Example
    </Text>
  );
};

// use a design token from the theme object
export const TypographyThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Text
      fontSize={tokens.fontSizes.xxl}
      fontWeight={tokens.fontWeights.semibold}
      lineHeight={tokens.lineHeights.medium}
    >
      Typography Styling Example
    </Text>
  );
};

// use a design token name
export const TypographyTokenNameExample = () => {
  return (
    <Text fontSize="xxl" fontWeight="semibold" lineHeight="medium">
      Typography Styling Example
    </Text>
  );
};
