import { Alert, useTheme } from '@aws-amplify/ui-react';

//use any CSS value
export const ColorStylePropExample = () => {
  return (
    <Alert variation="info" color="rgb(125, 214, 232)">
      Color Styling Example
    </Alert>
  );
};

//use a design token from the theme object
export const ColorThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Alert color={tokens.colors.brand.primary[80]}>Color Styling Example</Alert>
  );
};

//use a design token name
export const ColorTokenNameExample = () => {
  return (
    <Alert variation="info" color="brand.primary.80">
      Color Styling Example
    </Alert>
  );
};
