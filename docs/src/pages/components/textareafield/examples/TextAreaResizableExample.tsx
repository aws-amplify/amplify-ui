import { TextAreaField } from '@aws-amplify/ui-react';

export const TextAreaResizableExample = () => {
  return (
    <TextAreaField
      label="Address"
      placeholder="1234 Main St."
      descriptiveText="Please enter a USPS validated address"
      resize="vertical"
    />
  );
};
