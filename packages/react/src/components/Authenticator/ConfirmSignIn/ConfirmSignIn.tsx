import {
  AuthChallengeNames,
  getActorState,
  SignInContext,
  SignInState,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
} from '../shared';

export const ConfirmSignIn = (): JSX.Element => {
  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('confirmSignIn.pending');

  const footerProps: ConfirmSignInFooterProps = {
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
          <ConfirmationCodeInput errorText={remoteError} />
        </Flex>

        <ConfirmSignInFooter {...footerProps} />
      </Flex>
    </Form>
  );
};
