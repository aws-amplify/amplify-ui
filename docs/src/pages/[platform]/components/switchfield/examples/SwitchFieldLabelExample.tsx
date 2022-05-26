import { SwitchField, View } from '@aws-amplify/ui-react';

export const SwitchFieldLabelExample = () => {
  return (
    <>
      <SwitchField label="This is a switch" />
      <SwitchField label={<View as="span">This is a JSX label</View>} />
    </>
  );
};
