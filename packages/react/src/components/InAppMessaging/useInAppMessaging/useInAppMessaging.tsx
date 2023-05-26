import {
  useInAppMessaging as useInAppMsg,
  UseInAppMessaging,
} from '@aws-amplify/ui-react-core-notifications';

import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

function useInAppMessaging(): UseInAppMessaging {
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'The `useInAppMessaging` component has been migrated to `@aws-amplify/ui-react-notifications` and will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-notifications` and update the import path.',
  });

  return useInAppMsg();
}

export default useInAppMessaging;
