import {
  Field,
  FieldDescription,
  FieldErrorMessage,
  FieldLabel,
} from '@aws-amplify/ui-react';

export const FieldExample = () => {
  return (
    <Field>
      <FieldLabel htmlFor="email-input">My label</FieldLabel>
      <FieldDescription id="email-input-desc">Description</FieldDescription>
      <input type="text" id="email-input" aria-describedby="email-input-desc" />
      <FieldErrorMessage hasError>Error!</FieldErrorMessage>
    </Field>
  );
};
