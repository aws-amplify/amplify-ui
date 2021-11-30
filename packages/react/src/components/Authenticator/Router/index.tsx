import { CognitoUserAmplify } from '@aws-amplify/ui';
import * as React from 'react';

import { useAuthenticator } from '..';
import { View } from '../../..';
import { ConfirmSignIn } from '../ConfirmSignIn';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ForceNewPassword } from '../ForceNewPassword';
import { ConfirmResetPassword, ResetPassword } from '../ResetPassword';
import { SetupTOTP } from '../SetupTOTP';
import { SignInSignUpTabs } from '../shared';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';

export type RouterProps = {
  className?: string;
  children: ({
    signOut,
    user,
  }: {
    signOut: ReturnType<typeof useAuthenticator>['signOut'];
    user: CognitoUserAmplify;
  }) => JSX.Element;
  variation?: 'default' | 'modal';
};

const hasTabItems = (route: string) => {
  return route === 'signIn' || 'signUp';
};

export function Router({
  children,
  className,
  variation = 'default',
}: RouterProps) {
  const {
    components: { Header, Footer },
    route,
    signOut,
    user,
  } = useAuthenticator();

  if (['authenticated', 'signOut'].includes(route)) {
    return children({ signOut, user });
  }

  return (
    <>
      <View
        className={className}
        data-amplify-authenticator=""
        data-variation={variation}
      >
        <View data-amplify-container="">
          <Header />

          <View
            data-amplify-router=""
            data-amplify-router-content={hasTabItems(route) ? undefined : ''}
          >
            {(() => {
              switch (route) {
                case 'idle':
                  return null;
                case 'confirmSignUp':
                  return <ConfirmSignUp />;
                case 'confirmSignIn':
                  return <ConfirmSignIn />;
                case 'setupTOTP':
                  return <SetupTOTP />;
                case 'signIn':
                case 'signUp':
                  return <SignInSignUpTabs />;
                case 'forceNewPassword':
                  return <ForceNewPassword />;
                case 'resetPassword':
                  return <ResetPassword />;
                case 'confirmResetPassword':
                  return <ConfirmResetPassword />;
                case 'verifyUser':
                  return <VerifyUser />;
                case 'confirmVerifyUser':
                  return <ConfirmVerifyUser />;

                default:
                  console.warn(
                    'Unhandled Authenicator route – please open an issue: ',
                    route
                  );

                  return null;
              }
            })()}
          </View>

          <Footer />
        </View>
      </View>
    </>
  );
}
