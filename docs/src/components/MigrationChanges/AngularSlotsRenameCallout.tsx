import { Alert, Text } from '@aws-amplify/ui-react';

export const AngularSlotsRenameCallout = () => {
  return (
    <Alert role="none" variation="info" heading={`@aws-amplify/ui-angular v4`}>
      <Text>
        <code>forgot-password-header</code> and{' '}
        <code>forgot-password-footer</code> are updated slot names in version 5
        of `@aws-amplify/ui-angular`. In versions 4 and earlier, use
        <code>reset-password-header</code> and{' '}
        <code>reset-password-footer</code> in their place.
      </Text>
    </Alert>
  );
};
