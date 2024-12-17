import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { FormFields } from '../shared/FormFields';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { RouteContainer, RouteProps } from '../RouteContainer';

const { getChallengeText } = authenticatorTextUtil;

export const SelectMfa = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SelectMfa: {
        Header = SelectMfa.Header,
        Footer = SelectMfa.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-select-mfa=""
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

SelectMfa.Header = function Header(): JSX.Element {
  const { challengeName } = useAuthenticator(({ challengeName }) => [
    challengeName,
  ]);

  return <Heading level={3}>{getChallengeText(challengeName)}</Heading>;
}

SelectMfa.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};
