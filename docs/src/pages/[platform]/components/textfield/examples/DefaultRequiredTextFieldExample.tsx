import { Button, Flex, TextField } from '@aws-amplify/ui-react';

export const DefaultRequiredTextFieldExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <TextField label="Email" type="email" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
