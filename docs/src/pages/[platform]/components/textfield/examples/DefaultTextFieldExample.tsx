import { TextField } from '@aws-amplify/ui-react';

export const DefaultTextFieldExample = () => {
  return (
    <TextField
      label="Name"
      placeholder="Galadriel"
      descriptiveText="Please enter valid name"
    />
  );
};
