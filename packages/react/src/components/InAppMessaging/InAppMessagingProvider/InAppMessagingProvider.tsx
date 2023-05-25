import * as React from 'react';
import {
  InAppMessagingProvider as InAppMsgProvider,
  InAppMessagingProviderProps,
} from '@aws-amplify/ui-react-core-notifications';

import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

function InAppMessagingProvider(
  props: InAppMessagingProviderProps
): JSX.Element {
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'The `InAppMessagingProvider` component has been migrated to `@aws-amplify/ui-react-notifications` and will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-notifications` and update the import path.',
  });

  return <InAppMsgProvider {...props} />;
}

export default InAppMessagingProvider;
