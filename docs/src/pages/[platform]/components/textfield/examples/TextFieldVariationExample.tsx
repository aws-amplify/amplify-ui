import { TextField } from '@aws-amplify/ui-react';

export const TextFieldVariationExample = () => {
  return (
    <>
      <TextField label="Default" />
      <TextField label="Quiet" variation="quiet" />
    </>
  );
};
