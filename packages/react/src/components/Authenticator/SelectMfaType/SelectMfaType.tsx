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

export const SelectMfaType = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => {
    return [context.isPending];
  });

  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SelectMfaType: {
        Header = SelectMfaType.Header,
        Footer = SelectMfaType.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-select-mfa-type=""
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

SelectMfaType.Header = function Header(): JSX.Element {
  const { challengeName } = useAuthenticator((context) => {
    return [context.challengeName];
  });
  const isSetup = challengeName === 'MFA_SETUP';
  return (
    <Heading level={3}>
      {['Multi-Factor', 'Authentication', isSetup && 'Setup']
        .filter(Boolean)
        .join(' ')}
    </Heading>
  );
};

SelectMfaType.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};
