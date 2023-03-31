import {
  Field,
  Label,
  FieldDescription,
  FieldErrorMessage,
} from '@aws-amplify/ui-react';

export const FieldExample = () => {
  return (
    <Field>
      <Label htmlFor="email-input">My label</Label>
      <FieldDescription id="email-input-desc">Description</FieldDescription>
      <input type="text" id="email-input" aria-describedby="email-input-desc" />
      <FieldErrorMessage hasError>Error!</FieldErrorMessage>
    </Field>
  );
};
