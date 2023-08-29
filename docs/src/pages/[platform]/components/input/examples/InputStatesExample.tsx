import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const InputStatesExample = () => {
  return (
    <Flex direction="column" gap="1rem">
      <Label htmlFor="disabled">Disabled</Label>
      <Input id="disabled" defaultValue="Disabled" isDisabled />
      <Label htmlFor="readonly">Readonly</Label>
      <Input id="readonly" defaultValue="You can't edit me!" isReadOnly />
    </Flex>
  );
};
