import { Button, VisuallyHidden, IconDone } from '@aws-amplify/ui-react';

export const DefaultVisuallyHiddenExample = () => {
  return (
    <Button variation="primary">
      <VisuallyHidden>Donemark</VisuallyHidden>
      <IconDone size="large" />
    </Button>
  );
};
