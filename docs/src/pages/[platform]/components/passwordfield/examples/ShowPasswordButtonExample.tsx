import { PasswordField } from '@aws-amplify/ui-react';

export const ShowPasswordButtonExample = () => {
  return (
    <PasswordField
      label="Password"
      showPasswordButtonLabel="Toggle password shown/hidden"
      passwordIsHiddenLabel="Your password is hidden"
      passwordIsShownLabel="Your password is shown"
    />
  );
};
