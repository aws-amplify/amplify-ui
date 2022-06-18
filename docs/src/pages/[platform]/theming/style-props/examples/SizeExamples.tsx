import { Card, View, Text, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const SizeStylePropExample = () => {
  return (
    <View backgroundColor="rgb(131, 140, 149)" padding="1rem" fontSize="3rem">
      <Card width="4.5em" height="4.5rem">
        <Text fontSize="1rem">Size Styling Example</Text>
      </Card>
    </View>
  );
};

// use a design token from the theme object
export const SizeThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.neutral[60]}
      padding={tokens.space.medium}
      fontSize={tokens.fontSizes.xxxxl}
    >
      <Card width={tokens.space.relative.xxxl} height={tokens.space.xxxl}>
        <Text fontSize={tokens.fontSizes.medium}>Size Styling Example</Text>
      </Card>
    </View>
  );
};

// use a design token name
export const SizeTokenNameExample = () => {
  return (
    <View backgroundColor="neutral.60" padding="medium" fontSize="xxxxl">
      <Card width="relative.xxxl" height="xxxl">
        <Text fontSize="medium">Size Styling Example</Text>
      </Card>
    </View>
  );
};
