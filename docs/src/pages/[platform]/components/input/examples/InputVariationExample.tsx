import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const InputVariationExample = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" gap="small">
        <Label htmlFor="Default">Default</Label>
        <Input id="default" />
      </Flex>
      <Flex direction="column" gap="small">
        <Label htmlFor="Quiet">Quiet</Label>
        <Input id="quiet" variation="quiet" />
      </Flex>
    </Flex>
  );
};
