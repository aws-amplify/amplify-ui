import { Input, Label, Flex } from '@aws-amplify/ui-react';

export const InputEventHandlersExample = () => (
  <Flex direction="column" gap="small">
    <Label htmlFor="events">Event handlers</Label>
    <Input
      id="events"
      onSelect={(e) => console.info('onSelect fired:', e.currentTarget.value)}
      onInput={(e) => console.info('onInput fired:', e.currentTarget.value)}
      onChange={(e) => console.info('onChange fired:', e.currentTarget.value)}
      onCopy={(e) => console.info('onCopy fired:', e.currentTarget.value)}
      onPaste={(e) => console.info('onPaste fired:', e.currentTarget.value)}
      onCut={(e) => console.info('onCut fired:', e.currentTarget.value)}
    />
  </Flex>
);
