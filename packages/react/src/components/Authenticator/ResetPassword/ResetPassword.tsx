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

const {
  getBackToSignInText,
  getSendingText,
  getSendCodeText,
  getResetYourPasswordText,
} = authenticatorTextUtil;

export const ResetPassword = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ResetPassword: {
        Header = ResetPassword.Header,
        Footer = ResetPassword.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-resetpassword=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            <FormFields />
          </Flex>

          <RemoteErrorMessage />
          <TwoButtonSubmitFooter
            cancelButtonText={getBackToSignInText()}
            cancelButtonSendType="SIGN_IN"
            submitButtonText={
              isPending ? (
                <>{getSendingText()}&hellip;</>
              ) : (
                <>{getSendCodeText()}</>
              )
            }
          />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

ResetPassword.Header = function Header(): JSX.Element {
  return <Heading level={3}>{getResetYourPasswordText()}</Heading>;
};

ResetPassword.Footer = function Footer(): JSX.Element {
  return null;
};
