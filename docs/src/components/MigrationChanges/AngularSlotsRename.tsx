import { Alert, Text } from '@aws-amplify/ui-react';
import { MAJOR_VERSIONS } from '../../data/frameworks';

export const AngularSlotsRename = () => {
  return (
    <Alert
      role="none"
      variation="info"
      heading={`Angular ${MAJOR_VERSIONS['angular'][1]}`}
    >
      <Text>
        <code>forgot-password-header</code> and{' '}
        <code>forgot-password-footer</code> were renamed in version{' '}
        {MAJOR_VERSIONS['angular'][0]}. In versions{' '}
        {MAJOR_VERSIONS['angular'][1]} and earlier, use
        <code>reset-password-header</code> and{' '}
        <code>reset-password-footer</code> in their place.
      </Text>
    </Alert>
  );
};
