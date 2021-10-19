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

export function Router({ className, children }) {
  const { route, signOut, user } = useAuthenticator();

  return (
    <>
      <View className={className} data-amplify-authenticator="">
        <View data-authenticator-variation="modal" />

        <View data-amplify-container="">
          {(() => {
            switch (route) {
              case 'authenticated':
                return children({ signOut, user });

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

              case 'idle':
                return null;
            }
          })()}
        </View>
      </View>
    </>
  );
}
