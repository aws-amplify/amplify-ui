import { Button, Flex, Input, Label } from '@aws-amplify/ui-react';

export const DefaultRequiredInputExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
