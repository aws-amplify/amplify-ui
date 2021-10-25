import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Flex, Form, Heading } from '../../..';
import { ConfirmationCodeInput, ConfirmSignInFooter } from '../shared';

export const ConfirmSignIn = (): JSX.Element => {
  const { _state, error, submitForm, updateForm } = useAuthenticator();
  const actorState: SignInState = getActorState(_state);

  const { challengeName } = actorState.context as SignInContext;
  let mfaType: string = 'SMS';
  if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
    mfaType = 'TOTP';
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-confirmsignin=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get(`Confirm ${mfaType} Code`)}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput errorText={error} />
        </Flex>

        <ConfirmSignInFooter />
      </Flex>
    </Form>
  );
};
