import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const InputStatesExample = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" gap="small">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" defaultValue="Disabled" isDisabled />
      </Flex>
      <Flex direction="column" gap="small">
        <Label htmlFor="readonly">Readonly</Label>
        <Input id="readonly" defaultValue="You can't edit me!" isReadOnly />
      </Flex>
    </Flex>
  );
};
