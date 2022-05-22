import * as React from 'react';
import { PasswordField, Button, Flex } from '@aws-amplify/ui-react';

export const HidePasswordFieldExample = () => {
  const [hideShowPassword, setHideShowPassword] = React.useState(true);
  const toggleHide = () => {
    setHideShowPassword(!hideShowPassword);
  };
  return (
    <Flex direction="column">
      <PasswordField
        label="Password"
        name="password"
        hideShowPassword={hideShowPassword}
      />
      <Button onClick={toggleHide}>
        HideShowPassword: {hideShowPassword.toString()}
      </Button>
    </Flex>
  );
};
