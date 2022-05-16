import * as React from 'react';
import { Flex, PasswordField } from '@aws-amplify/ui-react';

export const ValidationErrorExample = () => {
  const [password, setPassword] = React.useState('1234');
  const validationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const errorMessage = `Requires uppercase, lowercase, and number with a minimum of 8 chars`;
  return (
    <Flex gap="1rem" direction="column">
      <PasswordField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label="Password"
        value={password}
        hasError={!validationRegex.test(password)}
        errorMessage={errorMessage}
      />
    </Flex>
  );
};
