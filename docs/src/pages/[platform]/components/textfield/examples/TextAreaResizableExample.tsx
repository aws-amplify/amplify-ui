import { TextField } from '@aws-amplify/ui-react';

export const TextAreaResizableExample = () => {
  return (
    <TextField
      label="Address"
      placeholder="1234 Main St."
      descriptiveText="Please enter a USPS validated address"
      isMultiline={true}
      resize="vertical"
    />
  );
};
