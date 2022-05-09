import { PasswordField } from '@aws-amplify/ui-react';

export const HidePasswordFieldExample = () => {
  return (
    <PasswordField label="Password" name="password" hideShowPassword={true} />
  );
};
