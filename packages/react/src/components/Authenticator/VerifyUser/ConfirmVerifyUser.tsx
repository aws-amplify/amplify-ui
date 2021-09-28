import { getActorState, SignInState } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormSubmit } from '../../../utils';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmVerifyUser = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.ConfirmVerifyUser';
  const {
    components: { Flex, FieldGroup, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, _send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const isPending = actorState.matches('confirmVerifyUser.pending');

  const headerText = I18n.get(
    'Account recovery requires verified contact information'
  );

  return (
    <Form
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onSubmit={handleFormSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{headerText}</Heading>

        <FieldGroup direction="column" disabled={isPending}>
          <ConfirmationCodeInput amplifyNamespace={amplifyNamespace} />
        </FieldGroup>

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />

        <TwoButtonSubmitFooter
          amplifyNamespace={amplifyNamespace}
          isPending={isPending}
          cancelButtonText={I18n.get('Skip')}
          cancelButtonSendType="SKIP"
        />
      </Flex>
    </Form>
  );
};
