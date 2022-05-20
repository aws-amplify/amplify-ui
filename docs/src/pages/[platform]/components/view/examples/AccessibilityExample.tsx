import { View } from '@aws-amplify/ui-react';
import { MdAccessibility } from 'react-icons/md';

export const AccessibilityExample = () => {
  return (
    <View
      ariaLabel="So accessible!"
      role="button"
      onClick={() => alert('Hooray for accessbility!')}
    >
      <MdAccessibility />
    </View>
  );
};
