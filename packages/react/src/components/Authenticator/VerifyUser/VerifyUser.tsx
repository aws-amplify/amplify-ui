import {
  defaultFormFieldOptions,
  censorAllButFirstAndLast,
  censorPhoneNumber,
  ContactMethod,
  getActorContext,
  SignInContext,
  translate,
} from '@aws-amplify/ui';

import { Heading } from '../../../primitives/Heading';
import { Radio } from '../../../primitives/Radio';
import { RadioGroupField } from '../../../primitives/RadioGroupField';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { TwoButtonSubmitFooter } from '../shared/TwoButtonSubmitFooter';

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
        {censorContactInformation(defaultFormFieldOptions[key].label, value)}
      </Radio>
    );

    radioButtons.push(radio);
  }

  return radioButtons;
};

export const VerifyUser = (): JSX.Element => {
  const {
    components: {
      VerifyUser: { Header = VerifyUser.Header, Footer = VerifyUser.Footer },
    },
  } = useCustomComponents();

  // TODO: expose unverifiedAttributes from `useAuthenticator`
  const { _state, isPending } = useAuthenticator((context) => [
    context.isPending,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();
  const context = getActorContext(_state) as SignInContext;

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
      isDisabled={isPending}
    >
      {generateRadioGroup(context.unverifiedAttributes)}
    </RadioGroupField>
  );

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-verifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        {verificationRadioGroup}

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
          submitButtonText={footerSubmitText}
        />
        <Footer />
      </fieldset>
    </form>
  );
};

VerifyUser.Header = () => {
  return (
    <Heading level={3}>
      {translate('Account recovery requires verified contact information')}
    </Heading>
  );
};

VerifyUser.Footer = (): JSX.Element => null;
