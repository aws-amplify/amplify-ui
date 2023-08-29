import { Input, Label } from '@aws-amplify/ui-react';

export const InputEventHandlersExample = () => (
  <>
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
  </>
);
