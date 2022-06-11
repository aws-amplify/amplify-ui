import { TextAreaField } from '@aws-amplify/ui-react';

export const TextAreaFieldVariationExample = () => {
  return (
    <>
      <TextAreaField label="Default" />
      <TextAreaField label="Quiet" variation="quiet" />
    </>
  );
};
