import { Button, Flex, Text, Input, Label } from '@aws-amplify/ui-react';

export const RequiredInputExample = () => {
  return (
    <Flex as="form" direction="column" width="20rem">
      <Label htmlFor="email">
        Email
        <Text as="span" fontSize="0.8rem" color="red">
          {' '}
          (required)
        </Text>
      </Label>
      <Input id="email" name="email" type="email" isRequired={true} />
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
