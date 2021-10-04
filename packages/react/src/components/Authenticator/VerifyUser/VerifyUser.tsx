import {
  getActorState,
  getActorContext,
  SignInState,
  SignInContext,
  authInputAttributes,
} from '@aws-amplify/ui';
import { Radio } from '@aws-amplify/ui-react';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

const generateRadioGroup = (
  attributes: Record<string, string>
): JSX.Element[] => {
  const radioButtons: JSX.Element[] = [];

  for (const [key, value] of Object.entries(attributes)) {
    const radio = (
      <Radio name="unverifiedAttr" value={key} key={key}>
        {I18n.get(authInputAttributes[key].label)}
      </Radio>
    );

    radioButtons.push(radio);
  }

  return radioButtons;
};

export const VerifyUser = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.VerifyUser';
  const {
    components: { Flex, Form, Heading, RadioGroupField },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuthenticator();
  const actorState: SignInState = getActorState(_state);
  const context = getActorContext(_state) as SignInContext;
  const isPending = actorState.matches('verifyUser.pending');

  const headerText = I18n.get(
    'Account recovery requires verified contact information'
  );
  const footerSubmitText = isPending ? (
    <>Verifying&hellip;</>
  ) : (
    <>{I18n.get('Verify')}</>
  );

  const verificationRadioGroup = (
    <RadioGroupField
      label={I18n.get('Verify Contact')}
      name="verify_context"
      disabled={isPending}
    >
      {generateRadioGroup(context.unverifiedAttributes)}
    </RadioGroupField>
  );

  return (
    <Form
      data-amplify-authenticator-verifyuser=""
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

        {verificationRadioGroup}

        <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />

        <TwoButtonSubmitFooter
          amplifyNamespace={amplifyNamespace}
          isPending={isPending}
          cancelButtonText={I18n.get('Skip')}
          cancelButtonSendType="SKIP"
          submitButtonText={footerSubmitText}
        />
      </Flex>
    </Form>
  );
};
