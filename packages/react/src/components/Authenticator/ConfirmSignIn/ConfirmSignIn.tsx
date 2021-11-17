import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import { ConfirmationCodeInput, ConfirmSignInFooter } from '../shared';
import { isInputTarget } from '../../../helpers/utils';

export const ConfirmSignIn = (): JSX.Element => {
  const { _state, error, submitForm, updateForm } = useAuthenticator();
  const actorState = getActorState(_state) as SignInState;

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
  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputTarget(event.target)) {
      let { checked, name, type, value } = event.target;
      if (type === 'checkbox' && !checked) value = undefined;

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <form
      data-amplify-form=""
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
    </form>
  );
};
