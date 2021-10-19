import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { TabItem, Tabs } from '../../../primitives';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

export const SignInSignUpTabs = (): JSX.Element => {
  const { route, signIn, signUp } = useAuthenticator();

  return (
    <Tabs
      indicatorPosition="top"
      currentIndex={route === 'signIn' ? 0 : 1}
      spacing="equal"
      justifyContent="center"
      onChange={route === 'signIn' ? void signUp : void signIn}
    >
      <TabItem title={I18n.get('Sign In')}>
        {route === 'signIn' && <SignIn />}
      </TabItem>
      <TabItem title={I18n.get('Create Account')}>
        {route === 'signUp' && <SignUp />}
      </TabItem>
    </Tabs>
  );
};
