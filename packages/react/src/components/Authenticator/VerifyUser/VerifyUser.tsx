import {
  getActorState,
  getActorContext,
  SignInState,
  SignInContext,
  authInputAttributes,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAmplify, useAuth } from '../../../hooks';
import { ErrorText, TwoButtonSubmitFooter } from '../shared';

const generateRadioGroup = (
  attributes: Record<string, string>
): JSX.Element[] => {
  const radioButtons: JSX.Element[] = [];

  for (const [key, value] of Object.entries(attributes)) {
    const radio = (
      <label key={key}>
        <input type="radio" name="unverifiedAttr" value={key} />
        {I18n.get(authInputAttributes[key].label)}
      </label>
    );

    radioButtons.push(radio);
  }

  return radioButtons;
};

export const VerifyUser = (): JSX.Element => {
  const amplifyNamespace = 'Authenticator.VerifyUser';
  const {
    components: { Fieldset, Form, Heading },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
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
    <Fieldset disabled={isPending}>
      {generateRadioGroup(context.unverifiedAttributes)}
    </Fieldset>
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
      <Heading level={1}>{headerText}</Heading>

      {verificationRadioGroup}

      <ErrorText amplifyNamespace={amplifyNamespace} />

      <TwoButtonSubmitFooter
        amplifyNamespace={amplifyNamespace}
        isPending={isPending}
        cancelButtonText={I18n.get('Skip')}
        cancelButtonSendType="SKIP"
        submitButtonText={footerSubmitText}
      />
    </Form>
  );
};
