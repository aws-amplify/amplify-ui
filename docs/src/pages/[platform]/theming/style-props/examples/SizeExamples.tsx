import { Badge, useTheme } from '@aws-amplify/ui-react';

//use any CSS value
export const SizeStylePropExample = () => {
  return (
    <Badge variation="info" width="100%" height="2rem">
      Size Styling Example
    </Badge>
  );
};

//use a design token from the theme object
export const SizeThemeTokenExample = () => {
  const { tokens } = useTheme();
  return (
    <Badge
      variation="info"
      width={tokens.space.relative.full}
      height={tokens.space.xl}
    >
      Size Styling Example
    </Badge>
  );
};

//use a design token name
export const SizeTokenNameExample = () => {
  return (
    <Badge variation="info" width="relative.full" height="xl">
      Size Styling Example
    </Badge>
  );
};
