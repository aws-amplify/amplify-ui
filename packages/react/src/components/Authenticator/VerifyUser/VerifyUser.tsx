import {
  authInputAttributes,
  censorAllButFirstAndLast,
  censorPhoneNumber,
  ContactMethod,
  getActorContext,
  SignInContext,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, Radio, RadioGroupField } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

const censorContactInformation = (
  type: ContactMethod,
  value: string
): string => {
  const translated = I18n.get(type);
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
  const { _state, isPending, submitForm, updateForm } = useAuthenticator();
  const context = getActorContext(_state) as SignInContext;

  const footerSubmitText = isPending ? (
    <>Verifying&hellip;</>
  ) : (
    <>{I18n.get('Verify')}</>
  );

  const verificationRadioGroup = (
    <RadioGroupField
      label={I18n.get('Verify Contact')}
      labelHidden={true}
      name="verify_context"
      isDisabled={isPending}
    >
      {generateRadioGroup(context.unverifiedAttributes)}
    </RadioGroupField>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-verifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>
          {I18n.get('Account recovery requires verified contact information')}
        </Heading>

        {verificationRadioGroup}

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={I18n.get('Skip')}
          cancelButtonSendType="SKIP"
          submitButtonText={footerSubmitText}
        />
      </Flex>
    </Form>
  );
};
