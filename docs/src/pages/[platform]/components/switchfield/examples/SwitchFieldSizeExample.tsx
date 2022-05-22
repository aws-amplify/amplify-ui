import { SwitchField } from '@aws-amplify/ui-react';

export const SwitchFieldSizeExample = () => {
  return (
    <>
      <SwitchField label="This is a small switch" size="small" />
      <SwitchField label="This is a switch" />
      <SwitchField label="This is a large switch" size="large" />
    </>
  );
};
