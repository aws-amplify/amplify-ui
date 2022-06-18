import { Card, useTheme } from '@aws-amplify/ui-react';

//use any CSS value
export const BackgroundStylePropExample = () => {
  return (
    <Card backgroundColor="rgb(4, 125, 149)">Background Styling Example</Card>
  );
};

//use a design token from the theme object
export const BackgroundThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Card backgroundColor={tokens.colors.brand.primary[40]}>
      Background Styling Example
    </Card>
  );
};

//use a design token name
export const BackgroundTokenNameExample = () => {
  return (
    <Card backgroundColor="brand.primary.40">Background Styling Example</Card>
  );
};
