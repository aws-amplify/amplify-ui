import { I18n } from 'aws-amplify';
import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormSubmit } from '../../../utils';
import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
} from '../shared';

export const ConfirmSignIn = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmSignIn';
  const {
    components: { FieldGroup, Flex, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('confirmSignIn.pending');

  const footerProps: ConfirmSignInFooterProps = {
    amplifyNamespace,
    isPending,
    send,
  };

  const { challengeName, remoteError } = actorState.context as SignInContext;
  let mfaType: string = 'SMS';
  if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
    mfaType = 'TOTP';
  }

  const headerText = I18n.get(`Confirm ${mfaType} Code`);

  return (
    <Form
      data-amplify-authenticator-confirmsignin=""
      method="post"
      onSubmit={handleFormSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <FieldGroup direction="column" disabled={isPending}>
          <ConfirmationCodeInput
            amplifyNamespace={amplifyNamespace}
            errorText={remoteError}
          />
        </FieldGroup>

        <ConfirmSignInFooter {...footerProps} />
      </Flex>
    </Form>
  );
};
