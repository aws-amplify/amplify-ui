import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { FormFields as DefaultFormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

const { getChangePasswordText, getChangingText, getBackToSignInText } =
  authenticatorTextUtil;

export const ForceNewPassword = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending, toSignIn } = useAuthenticator((context) => [
    context.isPending,
    context.toSignIn,
  ]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      ForceNewPassword: {
        FormFields = ForceNewPassword.FormFields,
        Header = ForceNewPassword.Header,
        Footer = ForceNewPassword.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-forcenewpassword=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <FormFields />

          <RemoteErrorMessage />
          <Button
            isDisabled={isPending}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={getChangingText()}
          >
            {getChangePasswordText()}
          </Button>
          <Button
            onClick={toSignIn}
            type="button"
            variation="link"
            size="small"
          >
            {getBackToSignInText()}
          </Button>

          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

ForceNewPassword.FormFields = function FormFields(): JSX.Element | null {
  return <DefaultFormFields />;
};

ForceNewPassword.Header = function Header(): JSX.Element | null {
  return <Heading level={4}>{getChangePasswordText()}</Heading>;
};

ForceNewPassword.Footer = function Footer(): JSX.Element | null {
  return null;
};
