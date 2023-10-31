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
        <Tabs.Container
          value={route}
          isLazy
          onValueChange={() => (route === 'signIn' ? toSignUp() : toSignIn())}
        >
          <Tabs.List spacing="equal" indicatorPosition="top">
            <Tabs.Item value="signIn">{getSignInTabText()}</Tabs.Item>
            <Tabs.Item value="signUp">{getSignUpTabText()}</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel value="signIn" data-amplify-router-content="">
            <SignIn />
          </Tabs.Panel>
          <Tabs.Panel value="signUp" data-amplify-router-content="">
            <SignUp />
          </Tabs.Panel>
        </Tabs.Container>
      )}
    </RouteContainer>
  );
};
