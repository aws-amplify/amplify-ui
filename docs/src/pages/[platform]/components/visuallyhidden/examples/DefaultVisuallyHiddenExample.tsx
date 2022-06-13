import { Button, VisuallyHidden, Icon } from '@aws-amplify/ui-react';

const IconDone = () => {
  return (
    <Icon
      pathData="M9 16.2001L4.8 12.0001L3.4 13.4001L9 19.0001L21 7.0001L19.6 5.6001L9 16.2001Z"
      ariaLabel=""
    />
  );
};

export const DefaultVisuallyHiddenExample = () => {
  return (
    <Button variation="primary">
      <VisuallyHidden>Donemark</VisuallyHidden>
      <IconDone />
    </Button>
  );
};
