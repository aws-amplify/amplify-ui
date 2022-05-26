import { Flex, TextField } from '@aws-amplify/ui-react';

export const TextFieldValidationErrorExample = () => {
  return (
    <Flex gap="1rem" direction="column">
      <TextField
        label="Password"
        type="password"
        defaultValue="1234"
        hasError={true}
        errorMessage="Password should not be 1234! 😱"
      />
      <TextField
        label="Password"
        type="password"
        defaultValue="1234"
        hasError={true}
        variation="quiet"
        errorMessage="Password should not be 1234! 😱"
      />
    </Flex>
  );
};
