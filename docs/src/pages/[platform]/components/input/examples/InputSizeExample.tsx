import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const InputSizeExample = () => {
  return (
    <Flex direction="column">
      <Label htmlFor="small">Small</Label>
      <Input id="small" size="small" width="50%" />
      <Label htmlFor="default">Default</Label>
      <Input id="default" width="75%" />
      <Label htmlFor="large">Large</Label>
      <Input id="large" size="large" width="100%" />
    </Flex>
  );
};
