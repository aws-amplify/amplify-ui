import * as React from 'react';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

export const SetupEmail = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);

  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SetupEmail: { Header = SetupEmail.Header, Footer = SetupEmail.Footer },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-setup-email=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            <FormFields />
            <RemoteErrorMessage />
          </Flex>

          <ConfirmSignInFooter />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

SetupEmail.Header = function Header(): JSX.Element {
  return <Heading level={3}>Setup Email</Heading>;
};

SetupEmail.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};