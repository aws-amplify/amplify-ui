import { PasswordField } from '@aws-amplify/ui-react';

export const MaxLengthExample = () => {
  return <PasswordField label="Password" name="password" maxLength={10} />;
};
