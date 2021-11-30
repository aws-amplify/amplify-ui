import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { TabItem, Tabs, View } from '../../..';
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
  );
};
