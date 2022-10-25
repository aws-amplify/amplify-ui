import React from 'react';
import {
  defaultFormFieldOptions,
  censorAllButFirstAndLast,
  censorPhoneNumber,
  ContactMethod,
  translate,
  UnverifiedContactMethods,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Radio } from '../../../primitives/Radio';
import { RadioGroupField } from '../../../primitives/RadioGroupField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { TwoButtonSubmitFooter } from '../shared/TwoButtonSubmitFooter';
import { RouteContainer, RouteProps } from '../RouteContainer';

const {
  getSkipText,
  getVerifyText,
  getVerifyContactText,
  getAccountRecoveryInfoText,
} = authenticatorTextUtil;

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
  attributes: UnverifiedContactMethods
): JSX.Element[] => {
  return Object.entries(attributes).map(([key, value]: [string, string]) => (
    <Radio name="unverifiedAttr" value={key} key={key}>
      {censorContactInformation(
        (defaultFormFieldOptions[key] as { label: ContactMethod }).label,
        value
      )}
    </Radio>
  ));
};

export const VerifyUser = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const {
    components: {
      VerifyUser: { Header = VerifyUser.Header, Footer = VerifyUser.Footer },
    },
  } = useCustomComponents();

  const { isPending, unverifiedContactMethods } = useAuthenticator(
    ({ isPending, unverifiedContactMethods }) => [
      isPending,
      unverifiedContactMethods,
    ]
  );
  const { handleChange, handleSubmit } = useFormHandlers();

  const footerSubmitText = isPending ? (
    <>Verifying&hellip;</>
  ) : (
    <>{getVerifyText()}</>
  );

  const verificationRadioGroup = (
    <RadioGroupField
      label={getVerifyContactText()}
      labelHidden
      name="verify_context"
      isDisabled={isPending}
    >
      {generateRadioGroup(unverifiedContactMethods)}
    </RadioGroupField>
  );

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-verifyuser=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          {verificationRadioGroup}

          <RemoteErrorMessage />

          <TwoButtonSubmitFooter
            cancelButtonText={getSkipText()}
            cancelButtonSendType="SKIP"
            submitButtonText={footerSubmitText}
          />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

VerifyUser.Header = function Header(): JSX.Element {
  return <Heading level={3}>{getAccountRecoveryInfoText()}</Heading>;
};

VerifyUser.Footer = function Footer(): JSX.Element {
  return null;
};
