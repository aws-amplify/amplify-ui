import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { TabItem, Tabs } from '../../../primitives/Tabs';
import { View } from '../../../primitives/View';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { RouteContainer, RouteProps } from '../RouteContainer';

const { getSignInTabText, getSignUpTabText } = authenticatorTextUtil;

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
          <TabItem title={getSignInTabText()}>
            <View data-amplify-router-content="">
              {route === 'signIn' && <SignIn />}
            </View>
          </TabItem>
          <TabItem title={getSignUpTabText()}>
            <View data-amplify-router-content="">
              {route === 'signUp' && <SignUp />}
            </View>
          </TabItem>
        </Tabs>
      )}
    </RouteContainer>
  );
};
