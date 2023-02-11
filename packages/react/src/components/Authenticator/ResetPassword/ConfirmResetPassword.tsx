import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { TwoButtonSubmitFooter } from '../shared/TwoButtonSubmitFooter';
import { FormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

const { getResendCodeText, getResetYourPasswordText } = authenticatorTextUtil;

export const ConfirmResetPassword = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const { ConfirmResetPassword: components } = useCustomComponents();
  const Header = components?.Header ?? ConfirmResetPassword.Header;
  const Footer = components?.Footer ?? ConfirmResetPassword.Footer;

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-confirmresetpassword=""
        method="post"
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            <FormFields />
          </Flex>

          <RemoteErrorMessage />
          <TwoButtonSubmitFooter
            cancelButtonSendType="RESEND"
            cancelButtonText={getResendCodeText()}
          />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

ConfirmResetPassword.Header = function Header() {
  const headerText = getResetYourPasswordText();

  return <Heading level={3}>{headerText}</Heading>;
};

ConfirmResetPassword.Footer = function Footer() {
  return null;
};
