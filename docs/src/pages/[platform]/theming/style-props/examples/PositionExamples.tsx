import { Button, View, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const PositionStylePropExample = () => {
  return (
    <View position="relative" width="100%" height="4.5rem">
      <Button position="absolute" right="2rem" top="2rem">
        Position Styling Example
      </Button>
    </View>
  );
};

// use a design token from the theme object
export const PositionThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <View
      position="relative"
      width={tokens.space.relative.full}
      height={tokens.space.xxxl}
    >
      <Button
        position="absolute"
        right={tokens.space.relative.xl}
        top={tokens.space.relative.xl}
      >
        Position Styling Example
      </Button>
    </View>
  );
};

// use a design token name
export const PositionTokenNameExample = () => {
  return (
    <View position="relative" width="relative.full" height="xxxl">
      <Button position="absolute" right="relative.xl" top="relative.xl">
        Position Styling Example
      </Button>
    </View>
  );
};
