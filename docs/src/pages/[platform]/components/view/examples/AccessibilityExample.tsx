import { View } from '@aws-amplify/ui-react';

export const AccessibilityExample = () => {
  return (
    <View
      ariaLabel="To the moon!"
      role="button"
      onClick={() => alert('Blast off!')}
    >
      🚀
    </View>
  );
};
