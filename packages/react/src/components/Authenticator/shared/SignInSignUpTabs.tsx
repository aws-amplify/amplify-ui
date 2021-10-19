import { getActorState, translate } from '@aws-amplify/ui';
import { useAmplify, useAuthenticator } from '../../../hooks';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';

export const SignInSignUpTabs = (): JSX.Element => {
  const {
    components: { Tabs, TabItem },
  } = useAmplify('Authenticator');

  const [_state, send] = useAuthenticator();
  const actorState = getActorState(_state);

  const updateStateMachine = (): void => {
    const valToSend = _state.value === 'signIn' ? 'SIGN_UP' : 'SIGN_IN';

    send({ type: valToSend });
  };

  return (
    <Tabs
      indicatorPosition="top"
      currentIndex={actorState?.matches('signIn') ? 0 : 1}
      spacing="equal"
      justifyContent="center"
      onChange={updateStateMachine}
    >
      <TabItem title={translate('Sign In')}>
        {actorState?.matches('signIn') && <SignIn />}
      </TabItem>
      <TabItem title={translate('Create Account')}>
        {actorState?.matches('signUp') && <SignUp />}
      </TabItem>
    </Tabs>
  );
};
