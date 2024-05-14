import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const InputSizeExample = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" gap="small">
        <Label htmlFor="small">Small</Label>
        <Input id="small" size="small" width="50%" />
      </Flex>

      <Flex direction="column" gap="small">
        <Label htmlFor="default">Default</Label>
        <Input id="default" width="75%" />
      </Flex>

      <Flex direction="column" gap="small">
        <Label htmlFor="large">Large</Label>
        <Input id="large" size="large" width="100%" />
      </Flex>
    </Flex>
  );
};
