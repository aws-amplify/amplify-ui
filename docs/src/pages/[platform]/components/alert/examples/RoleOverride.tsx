import { Alert } from '@aws-amplify/ui-react';

export const RoleOverride = () => {
  return (
    <Alert role="none" variation="info">
      This alert will not be announced to screen readers if dyamically added to
      the DOM.
    </Alert>
  );
};
