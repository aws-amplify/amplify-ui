import { SwitchField } from '@aws-amplify/ui-react';

export const SwitchFieldLabelPositionExample = () => {
  return (
    <>
      <SwitchField label="This is a switch" labelPosition="start" />
      <SwitchField label="This is a switch" labelPosition="end" />
      <SwitchField label="This is a switch" labelPosition="top" />
      <SwitchField label="This is a switch" labelPosition="bottom" />
    </>
  );
};
