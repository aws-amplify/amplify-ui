import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Text } from '../../../primitives/Text';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { FormFields } from '../shared/FormFields';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

const { getChallengeText, getDeliveryMessageText, getDeliveryMethodText } =
  authenticatorTextUtil;

export const ConfirmSignIn = ({
  className,
  variation,
}: RouteProps): React.JSX.Element => {
  const { isPending, challengeName, codeDeliveryDetails } = useAuthenticator(
    (context) => [
      context.isPending,
      context.challengeName,
      context.codeDeliveryDetails,
    ]
  );
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      ConfirmSignIn: {
        Header = ConfirmSignIn.Header,
        Footer = ConfirmSignIn.Footer,
      },
    },
  } = useCustomComponents();

  const showDeliveryMessage =
    (challengeName === 'EMAIL_OTP' || challengeName === 'SMS_MFA') &&
    codeDeliveryDetails;

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-confirmsignin=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            {showDeliveryMessage && (
              <Text className="amplify-authenticator__subtitle">
                {getDeliveryMessageText(codeDeliveryDetails)}
              </Text>
            )}

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

function Header() {
  const { challengeName, codeDeliveryDetails } = useAuthenticator(
    ({ challengeName, codeDeliveryDetails }) => [
      challengeName,
      codeDeliveryDetails,
    ]
  );

  const showDeliveryMethod =
    (challengeName === 'EMAIL_OTP' || challengeName === 'SMS_MFA') &&
    codeDeliveryDetails;

  return (
    <>
      <Heading level={3}>{getChallengeText(challengeName)}</Heading>
      {showDeliveryMethod && (
        <Heading level={5}>
          {getDeliveryMethodText(codeDeliveryDetails)}
        </Heading>
      )}
    </>
  );
}

ConfirmSignIn.Header = Header;
ConfirmSignIn.Footer = function Footer(): React.JSX.Element {
  // @ts-ignore
  return null;
};
