import { Flex, Input, Label } from '@aws-amplify/ui-react';

export const AccessibilityExample = () => (
  <Flex direction="column" gap="small">
    <Label htmlFor="departure">Departure date</Label>
    <Input id="departure" type="date" />
  </Flex>
);
