import { Flex, PasswordField } from '@aws-amplify/ui-react';

export const ValidationErrorExample = () => {
  return (
    <Flex gap="1rem" direction="column">
      <PasswordField
        label="Password"
        defaultValue="1234"
        hasError={true}
        errorMessage="Password should not be 1234! 😱"
      />
    </Flex>
  );
};
