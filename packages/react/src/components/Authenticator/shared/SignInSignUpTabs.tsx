import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { TabItem, Tabs } from '../../..';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

export const SignInSignUpTabs = (): JSX.Element => {
  const { route, toSignIn, toSignUp } = useAuthenticator();

  return (
    <Tabs
      indicatorPosition="top"
      currentIndex={route === 'signIn' ? 0 : 1}
      spacing="equal"
      justifyContent="center"
      onChange={() => (route === 'signIn' ? toSignUp() : toSignIn())}
    >
      <TabItem title={translate('Sign In')}>
        {route === 'signIn' && <SignIn />}
      </TabItem>
      <TabItem title={translate('Create Account')}>
        {route === 'signUp' && <SignUp />}
      </TabItem>
    </Tabs>
  );
};
