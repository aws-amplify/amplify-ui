import { Button, Flex, Text, Input, Label } from '@aws-amplify/ui-react';

export const RequiredInputExample = () => {
  return (
    <Flex as="form" direction="column" width="100%">
      <Flex direction="column" gap="small">
        <Label htmlFor="email">
          Email
          <Text as="span" fontSize="small" color="font.error">
            {' '}
            (required)
          </Text>
        </Label>
        <Input id="email" name="email" type="email" isRequired={true} />
      </Flex>
      <Button type="submit">Submit</Button>
    </Flex>
  );
};
