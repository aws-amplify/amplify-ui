import { getActorState, SignUpState } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuthenticator } from '../../../hooks';

import {
  ConfirmationCodeInput,
  ConfirmationCodeInputProps,
  RemoteErrorMessage,
} from '../shared';

export function ConfirmSignUp() {
  const amplifyNamespace = 'Authenticator.ConfirmSignUp';
  const {
    components: { Button, Flex, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignUpState = getActorState(_state);
  const isPending = actorState.matches('confirmSignUp.pending');

  const confirmationCodeInputProps: ConfirmationCodeInputProps = {
    amplifyNamespace,
    label: I18n.get('Confirmation Code'),
    placeholder: I18n.get('Enter your code'),
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-confirmsignup=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Confirm Sign Up')}</Heading>

        <Flex direction="column">
          <ConfirmationCodeInput {...confirmationCodeInputProps} />

          <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />

          <Button
            variation="primary"
            isDisabled={isPending}
            type="submit"
            loadingText={I18n.get('Confirming')}
            isLoading={isPending}
            fontWeight="normal"
          >
            {I18n.get('Confirm')}
          </Button>

          <Button
            variation="default"
            onClick={() => {
              send({
                type: 'RESEND',
              });
            }}
            type="button"
            fontWeight="normal"
          >
            {I18n.get('Resend Code')}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}
