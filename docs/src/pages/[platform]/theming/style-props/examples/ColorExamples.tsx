import { Alert, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const ColorStylePropExample = () => {
  return (
    <Alert backgroundColor="#fff" color="hsl(190, 50%, 50%)">
      Color Styling Example
    </Alert>
  );
};

// use a design token from the theme object
export const ColorThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Alert
      backgroundColor={tokens.colors.white}
      color={tokens.colors.brand.primary[60]}
    >
      Color Styling Example
    </Alert>
  );
};

// use a design token name
export const ColorTokenNameExample = () => {
  return (
    <Alert backgroundColor="white" color="brand.primary.60">
      Color Styling Example
    </Alert>
  );
};
