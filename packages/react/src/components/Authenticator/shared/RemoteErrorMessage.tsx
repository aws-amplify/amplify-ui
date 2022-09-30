import React from 'react';
import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Alert } from '../../../primitives/Alert';

export const RemoteErrorMessage = (): JSX.Element => {
  const { error } = useAuthenticator((context) => [context.error]);

  return (
    <>
      {error ? (
        <Alert variation="error" isDismissible>
          {translate(error)}
        </Alert>
      ) : null}
    </>
  );
};
