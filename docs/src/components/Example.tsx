import { View } from '@aws-amplify/ui-react';

export function Example({ children, className }) {
  return (
    <View
      backgroundColor="rgba(249, 250, 251, 1)"
      borderRadius="0.25rem"
      boxShadow="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
      className={className}
      marginBottom="1.5rem"
      padding="1.5rem"
    >
      {children}
    </View>
  );
}
