import { getActorState, SignUpState } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuth } from '../../../hooks';

import {
  ConfirmationCodeInput,
  ConfirmationCodeInputProps,
  ConfirmSignInFooterProps,
} from '../shared';

export function ConfirmSignUp() {
  const amplifyNamespace = 'Authenticator.ConfirmSignUp';
  const {
    components: { Button, FieldGroup, Flex, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
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
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
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
          >
            {I18n.get('Resend Code')}
          </Button>
        </FieldGroup>
      </Flex>
    </Form>
  );
}
