import { PasswordField } from '@aws-amplify/ui-react';

export const PasswordFieldVariationExample = () => {
  return (
    <>
      <PasswordField label="Default" />
      <PasswordField label="Quiet" variation="quiet" />
    </>
  );
};
