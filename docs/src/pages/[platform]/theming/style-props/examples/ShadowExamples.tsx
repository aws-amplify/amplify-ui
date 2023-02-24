import { Button, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const ShadowStylePropExample = () => {
  return (
    <Button boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px">
      Shadow Styling Example
    </Button>
  );
};

// use a design token from the theme object
export const ShadowThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Button
      // @ts-ignore // IGNORE
      boxShadow={tokens.shadows.large}
    >
      Shadow Styling Example
    </Button>
  );
};

// use a design token name
export const ShadowTokenNameExample = () => {
  return <Button boxShadow="large">Shadow Styling Example</Button>;
};
