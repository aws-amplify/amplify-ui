import { Placeholder, useTheme } from '@aws-amplify/ui-react';

export const PlaceholderColorExample = () => {
  const { tokens } = useTheme();
  return (
    <Placeholder
      startColor={tokens.colors.neutral[80]}
      endColor={tokens.colors.teal[40]}
    />
  );
};
