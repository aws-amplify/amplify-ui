import {
  getActorState,
  getActorContext,
  SignInState,
  SignInContext,
  authInputAttributes,
  ContactMethod,
  censorPhoneNumber,
  censorAllButFirstAndLast,
  translate,
} from '@aws-amplify/ui';
import { Radio } from '@aws-amplify/ui-react';

import { useAmplify, useAuthenticator } from '../../../hooks';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

const censorContactInformation = (
  type: ContactMethod,
  value: string
): string => {
  const translated = translate(type);
  let newVal = value;

  if (type === 'Phone Number') {
    newVal = censorPhoneNumber(value);
  } else if (type === 'Email') {
    const splitEmail = value.split('@');
    const censoredName = censorAllButFirstAndLast(splitEmail[0]);

    newVal = `${censoredName}@${splitEmail[1]}`;
  }

  return `${translated}: ${newVal}`;
};

const generateRadioGroup = (
  attributes: Record<string, string>
): JSX.Element[] => {
  const radioButtons: JSX.Element[] = [];

  for (const [key, value] of Object.entries(attributes)) {
    const radio = (
      <Radio name="unverifiedAttr" value={key} key={key}>
        {censorContactInformation(authInputAttributes[key].label, value)}
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

  const headerText = translate(
    'Account recovery requires verified contact information'
  );
  const footerSubmitText = isPending ? (
    <>Verifying&hellip;</>
  ) : (
    <>{translate('Verify')}</>
  );

  const verificationRadioGroup = (
    <RadioGroupField
      label={translate('Verify Contact')}
      labelHidden={true}
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
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
          submitButtonText={footerSubmitText}
        />
      </Flex>
    </Form>
  );
};
