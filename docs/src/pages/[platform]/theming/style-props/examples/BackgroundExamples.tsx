import { Card, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const BackgroundStylePropExample = () => {
  return (
    <Card backgroundColor="hsl(190, 95%, 30%)" color="#fff">
      Background Styling Example
    </Card>
  );
};

// use a design token from the theme object
export const BackgroundThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Card
      backgroundColor={tokens.colors.brand.primary[80]}
      color={tokens.colors.white}
    >
      Background Styling Example
    </Card>
  );
};

// use a design token name
export const BackgroundTokenNameExample = () => {
  return (
    <Card backgroundColor="brand.primary.80" color="white">
      Background Styling Example
    </Card>
  );
};
