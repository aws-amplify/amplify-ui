import React from 'react';
import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { TabItem, Tabs } from '../../../primitives/Tabs';
import { View } from '../../../primitives/View';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { RouteContainer, RouteProps } from '../RouteContainer';

export const SignInSignUpTabs = ({
  className,
  hideSignUp,
  variation,
}: {
  hideSignUp: boolean;
} & RouteProps): JSX.Element => {
  const { route, toSignIn, toSignUp } = useAuthenticator((context) => [
    context.route,
    context.toSignIn,
    context.toSignUp,
  ]);
  return (
    <RouteContainer className={className} variation={variation}>
      {hideSignUp ? (
        <View data-amplify-router-content="">
          {route === 'signIn' && <SignIn />}
        </View>
      ) : (
        <Tabs
          indicatorPosition="top"
          currentIndex={route === 'signIn' ? 0 : 1}
          spacing="equal"
          justifyContent="center"
          onChange={() => (route === 'signIn' ? toSignUp() : toSignIn())}
        >
          <TabItem title={translate('Sign In')}>
            <View data-amplify-router-content="">
              {route === 'signIn' && <SignIn />}
            </View>
          </TabItem>
          <TabItem title={translate('Create Account')}>
            <View data-amplify-router-content="">
              {route === 'signUp' && <SignUp />}
            </View>
          </TabItem>
        </Tabs>
      )}
    </RouteContainer>
  );
};
