import { getActorState, SignUpState } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { handleFormSubmit } from '../../../utils';
import { ConfirmationCodeInput, ConfirmationCodeInputProps } from '../shared';

export function ConfirmSignUp() {
  const amplifyNamespace = 'Authenticator.ConfirmSignUp';
  const {
    components: { Button, FieldGroup, Flex, Form, Heading },
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
      onSubmit={handleFormSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Confirm Sign Up')}</Heading>

        <FieldGroup direction="column" disabled={isPending}>
          <ConfirmationCodeInput {...confirmationCodeInputProps} />

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
        </FieldGroup>
      </Flex>
    </Form>
  );
}
