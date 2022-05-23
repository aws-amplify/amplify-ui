import { View } from '@aws-amplify/ui-react';

export const DisabledStateExample = () => {
  return (
    <View
      as="button"
      isDisabled={true}
      onClick={() => alert("This won't fire 🚫")}
    >
      You cannot click me!
    </View>
  );
};
