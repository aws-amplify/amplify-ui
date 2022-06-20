import { Card, View, Text, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const SizeStylePropExample = () => {
  return (
    <View
      backgroundColor="hsl(190, 50%, 50%)"
      width="4.5rem"
      height="4.5rem"
    ></View>
  );
};

// use a design token from the theme object
export const SizeThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.brand.primary[60]}
      width={tokens.space.xxxl}
      height={tokens.space.xxxl}
    ></View>
  );
};

// use a design token name
export const SizeTokenNameExample = () => {
  return (
    <View backgroundColor="brand.primary.60" width="xxxl" height="xxxl"></View>
  );
};
