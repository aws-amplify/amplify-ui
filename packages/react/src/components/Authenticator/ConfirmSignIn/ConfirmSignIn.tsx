import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
} from '../shared';

export const ConfirmSignIn = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmSignIn';
  const {
    components: { Flex, Form, Heading },
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

  let mfaType: 'SMS' | 'TOTP';
  let headerText: string;

  switch (challengeName) {
    case AuthChallengeNames.SMS_MFA:
      mfaType = 'SMS';
      headerText = translate('Confirm SMS Code');
      break;
    case AuthChallengeNames.SOFTWARE_TOKEN_MFA:
      mfaType = 'TOTP';
      headerText = translate('Confirm TOTP Code');
      break;
    default:
      throw new Error(
        `Unexpected challengeName encountered in ConfirmSignIn: ${challengeName}`
      );
  }

  return (
    <Form
      data-amplify-authenticator-confirmsignin=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput
            amplifyNamespace={amplifyNamespace}
            errorText={remoteError}
          />
        </Flex>

        <ConfirmSignInFooter {...footerProps} />
      </Flex>
    </Form>
  );
};
