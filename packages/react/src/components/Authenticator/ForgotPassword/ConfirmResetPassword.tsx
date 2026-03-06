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
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

const { getResendCodeText, getResetYourPasswordText } = authenticatorTextUtil;

export const ConfirmResetPassword = ({
  className,
  variation,
}: RouteProps): React.JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      ConfirmResetPassword: {
        Header = ConfirmResetPassword.Header,
        Footer = ConfirmResetPassword.Footer,
      },
    },
  } = useCustomComponents();

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

ConfirmResetPassword.Header = function Header(): React.JSX.Element {
  const headerText = getResetYourPasswordText();

  return <Heading level={3}>{headerText}</Heading>;
};

ConfirmResetPassword.Footer = function Footer(): React.JSX.Element {
  // @ts-ignore
  return null;
};
