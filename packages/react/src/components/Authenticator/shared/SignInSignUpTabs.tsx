import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { Tabs } from '../../../primitives/Tabs';
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
          value={route}
          onChange={() => (route === 'signIn' ? toSignUp() : toSignIn())}
        >
          <Tabs.List
            spacing="equal"
            // justifyContent="center"
            indicatorPosition="top"
          >
            <Tabs.Tab value="signIn">{getSignInTabText()}</Tabs.Tab>
            <Tabs.Tab value="signUp">{getSignUpTabText()}</Tabs.Tab>
          </Tabs.List>

          <View data-amplify-router-content="">
            {route === 'signIn' && <SignIn />}
          </View>
          <View data-amplify-router-content="">
            {route === 'signUp' && <SignUp />}
          </View>
        </Tabs>
      )}
    </RouteContainer>
  );
};
