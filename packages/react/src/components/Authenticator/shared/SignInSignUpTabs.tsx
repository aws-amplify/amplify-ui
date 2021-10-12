import { getActorState } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import { useAmplify, useAuthenticator } from '../../../hooks';
import { useTheming } from '../../../theming';
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
      <TabItem title={I18n.get('Sign In')}>
        {actorState?.matches('signIn') && <SignIn />}
      </TabItem>
      <TabItem title={I18n.get('Create Account')}>
        {actorState?.matches('signUp') && <SignUp />}
      </TabItem>
    </Tabs>
  );
};
