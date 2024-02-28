import React from 'react';
import {
  defaultFormFieldOptions,
  censorContactMethod,
  ContactMethod,
  translate,
  UnverifiedUserAttributes,
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

const generateRadioGroup = (
  attributes: UnverifiedUserAttributes
): JSX.Element[] => {
  return Object.entries(attributes).map(([key, value]: [string, string]) => {
    const verificationType = (
      defaultFormFieldOptions[key] as { label: ContactMethod }
    ).label;
    return (
      <Radio name="unverifiedAttr" value={key} key={key}>
        {translate(verificationType)}:{' '}
        {censorContactMethod(verificationType, value)}
      </Radio>
    );
  });
};

export const VerifyUser = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const {
    components: {
      // @ts-ignore
      VerifyUser: { Header = VerifyUser.Header, Footer = VerifyUser.Footer },
    },
  } = useCustomComponents();

  const { isPending, unverifiedUserAttributes } = useAuthenticator(
    ({ isPending, unverifiedUserAttributes }) => [
      isPending,
      unverifiedUserAttributes,
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
      legend={getVerifyContactText()}
      name="verify_context"
      isDisabled={isPending}
      legendHidden
    >
      {generateRadioGroup(unverifiedUserAttributes)}
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
  // @ts-ignore
  return null;
};
