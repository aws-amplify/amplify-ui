import * as React from 'react';
import { CognitoUserAmplify } from '@aws-amplify/ui';
import { RouteProps } from '../RouteContainer';

import { UseAuthenticator } from '../hooks/useAuthenticator';

export type RouterProps = {
  children:
    | React.ReactNode
    | ((props?: {
        signOut?: UseAuthenticator['signOut'];
        user?: CognitoUserAmplify;
      }) => React.ReactNode);
  hideSignUp: boolean;
} & RouteProps;
