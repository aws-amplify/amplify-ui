import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import { useAmplify, useAuthenticator } from '../../../hooks';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmVerifyUser = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmVerifyUser';
  const {
    components: { Flex, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('confirmVerifyUser.pending');

  const headerText = translate(
    'Account recovery requires verified contact information'
  );

  return (
    <Form
      data-amplify-authenticator-confirmverifyuser=""
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
          <ConfirmationCodeInput amplifyNamespace={amplifyNamespace} />
        </Flex>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />

        <TwoButtonSubmitFooter
          amplifyNamespace={amplifyNamespace}
          isPending={isPending}
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
        />
      </Flex>
    </Form>
  );
};
