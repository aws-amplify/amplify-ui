import { Button, View, useTheme } from '@aws-amplify/ui-react';

// use any CSS value
export const PositionStylePropExample = () => {
  return (
    <View
      position="relative"
      width="100%"
      height="4.5rem"
      border="1px solid hsl(210, 8%, 55%)"
    >
      <Button position="absolute" right="0.5rem" top="0.5rem">
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
      border={`1px solid ${tokens.colors.border.primary}`}
    >
      <Button position="absolute" right={tokens.space.xs} top={tokens.space.xs}>
        Position Styling Example
      </Button>
    </View>
  );
};

// use a design token name
export const PositionTokenNameExample = () => {
  return (
    <View
      position="relative"
      width="relative.full"
      height="xxxl"
      border="1px solid hsl(210, 8%, 55%)"
    >
      <Button position="absolute" right="xs" top="xs">
        Position Styling Example
      </Button>
    </View>
  );
};
