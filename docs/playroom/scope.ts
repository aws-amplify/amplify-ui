import { useTheme } from '@aws-amplify/ui-react';

// This allows customers to write code like:
// <View backgroundColor={theme.tokens.colors.background.primary}>
// because it adds the `theme` variable in the scope
export default function useScope() {
  return {
    theme: useTheme(),
  };
}
