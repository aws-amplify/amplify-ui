import { Field } from '@aws-amplify/ui-react';

export const DefaultFieldExample = () => {
  const inputId = 'my-input';
  const descId = 'my-input-desc';
  return (
    <Field>
      <Field.Label htmlFor={inputId}>Label</Field.Label>
      <Field.Description id={descId}>Description</Field.Description>
      <Field.Input type="text" id={inputId} aria-describedby={descId} />
      <Field.ErrorMessage hasError>Error</Field.ErrorMessage>
    </Field>
  );
};
