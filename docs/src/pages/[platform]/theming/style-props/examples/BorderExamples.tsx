import { Button, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const BorderStylePropExample = () => {
  return (
    <Button
      borderRadius="0.5rem"
      borderStyle="dashed"
      borderColor="hsl(190, 70%, 70%)"
      borderWidth="medium"
    >
      Border Styling Example
    </Button>
  );
};

// use a design token from the theme object
export const BorderThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Button borderRadius={tokens.radii.medium}>Border Styling Example</Button>
  );
};

// use a design token name
export const BorderTokenNameExample = () => {
  return <Button borderRadius="medium">Border Styling Example</Button>;
};
