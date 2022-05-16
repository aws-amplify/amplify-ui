import { Flex, PasswordField, Button } from '@aws-amplify/ui-react';

export const IsRequiredExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <PasswordField label="Password" name="password" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
