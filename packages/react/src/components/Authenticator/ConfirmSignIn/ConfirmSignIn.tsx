import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Form, Heading } from '../../..';
import { ConfirmationCodeInput, ConfirmSignInFooter } from '../shared';

export const ConfirmSignIn = (): JSX.Element => {
  const { _state, error, submitForm, updateForm } = useAuthenticator();
  const actorState: SignInState = getActorState(_state);

  const { challengeName } = actorState.context as SignInContext;
  let headerText: string;

  switch (challengeName) {
    case AuthChallengeNames.SMS_MFA:
      headerText = translate('Confirm SMS Code');
      break;
    case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
      headerText = translate('Confirm TOTP Code');
      break;
    default:
      throw new Error(
        `Unexpected challengeName encountered in ConfirmSignIn: ${challengeName}`
      );
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
        <Heading level={3}>{headerText}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput errorText={error} />
        </Flex>

        <ConfirmSignInFooter />
      </Flex>
    </Form>
  );
};
