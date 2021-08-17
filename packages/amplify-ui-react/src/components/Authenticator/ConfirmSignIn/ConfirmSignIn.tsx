import { AuthChallengeNames } from '@aws-amplify/ui-core';
import { useAmplify, useAuth } from '../../../hooks';

import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
} from '../shared';

/**
 * placeholder component
 */
export const ConfirmSignIn = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmSignIn';
  const {
    components: { Fieldset, Form, Heading, Label },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const isPending = state.matches('confirmSignIn.pending');

  const footerProps: ConfirmSignInFooterProps = {
    amplifyNamespace,
    isPending,
    send,
  };

  const { challengeName, remoteError } = state.context;
  let mfaType: string = 'SMS';
  if (challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA) {
    mfaType = 'TOTP';
  }

  const headerText = `Confirm ${mfaType} Code`;

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
      <Heading level={1}>{headerText}</Heading>

      <Fieldset disabled={isPending}>
        <Label data-amplify-confirmationcode>
          <ConfirmationCodeInput
            amplifyNamespace={amplifyNamespace}
            errorText={remoteError}
          />
        </Label>
      </Fieldset>

      <ConfirmSignInFooter {...footerProps} />
    </Form>
  );
};
