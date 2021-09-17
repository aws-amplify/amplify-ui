import { I18n } from 'aws-amplify';

import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { useAmplify, useAuth } from '../../../hooks';

export const SignInSignUpTabs = (): JSX.Element => {
  const {
    components: { Tabs, TabItem },
  } = useAmplify('Authenticator');

  const [_state, send] = useAuth();

  const updateStateMachine = (): void => {
    const valToSend = _state.value === 'signIn' ? 'SIGN_UP' : 'SIGN_IN';

    send({ type: valToSend });
  };

  return (
    <Tabs grow="equal" justifyContent="center" onChange={updateStateMachine}>
      <TabItem title={I18n.get('Sign In')}>
        <SignIn />
      </TabItem>
      <TabItem title={I18n.get('Create Account')}>
        <SignUp />
      </TabItem>
    </Tabs>
  );
};
