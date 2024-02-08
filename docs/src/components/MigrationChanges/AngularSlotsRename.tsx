import { Alert, Text } from '@aws-amplify/ui-react';
import {
  CURRENT_MAJOR_VERSIONS,
  PREV_MAJOR_VERSIONS,
} from '../../data/frameworks';

export const AngularSlotsRename = () => {
  return (
    <Alert
      role="none"
      variation="info"
      heading={`ui-angular@${PREV_MAJOR_VERSIONS['angular']}.x`}
    >
      <Text>
        <code>forgot-password-header</code> and{' '}
        <code>forgot-password-footer</code> are updated slot names in version{' '}
        {CURRENT_MAJOR_VERSIONS['angular']} of ui-angular. In versions{' '}
        {PREV_MAJOR_VERSIONS['angular']} and earlier, use
        <code>reset-password-header</code> and{' '}
        <code>reset-password-footer</code> in their place.
      </Text>
    </Alert>
  );
};
