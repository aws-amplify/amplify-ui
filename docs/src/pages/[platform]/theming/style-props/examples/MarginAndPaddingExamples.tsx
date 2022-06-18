import { Button, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const MarginAndPaddingStylePropExample = () => {
  return (
    <Button padding="1rem" margin="1rem">
      Margin and Padding Styling Example
    </Button>
  );
};

// use a design token from the theme object
export const MarginAndPaddingThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Button padding={tokens.space.large} margin={tokens.space.large}>
      Margin and Padding Styling Example
    </Button>
  );
};

// use a design token name
export const MarginAndPaddingTokenNameExample = () => {
  return (
    <Button padding="large" margin="large">
      Margin and Padding Styling Example
    </Button>
  );
};
