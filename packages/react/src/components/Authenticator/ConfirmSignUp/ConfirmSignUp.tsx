import React from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Text } from '../../../primitives/Text';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { FormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

const {
  getDeliveryMessageText,
  getDeliveryMethodText,
  getConfirmingText,
  getConfirmText,
  getResendCodeText,
} = authenticatorTextUtil;
export function ConfirmSignUp({
  className,
  variation,
}: RouteProps): JSX.Element {
  const { isPending, resendCode, codeDeliveryDetails } = useAuthenticator(
    (context) => [
      context.isPending,
      context.resendCode,
      context.codeDeliveryDetails,
    ]
  );
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmSignUp: {
        Header = ConfirmSignUp.Header,
        Footer = ConfirmSignUp.Footer,
      },
    },
  } = useCustomComponents();

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-confirmsignup=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            <Text className="amplify-authenticator__subtitle">
              {getDeliveryMessageText(codeDeliveryDetails)}
            </Text>

            <FormFields />

            <RemoteErrorMessage />

            <Button
              variation="primary"
              isDisabled={isPending}
              type="submit"
              loadingText={getConfirmingText()}
              isLoading={isPending}
              fontWeight="normal"
            >
              {getConfirmText()}
            </Button>

            <Button onClick={resendCode} type="button" fontWeight="normal">
              {getResendCodeText()}
            </Button>
          </Flex>
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
}

const DefaultHeader = () => {
  const { codeDeliveryDetails } = useAuthenticator((context) => [
    context.codeDeliveryDetails,
  ]);

  return (
    <Heading level={4}>{getDeliveryMethodText(codeDeliveryDetails)}</Heading>
  );
};

ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.Footer = function Footer(): JSX.Element {
  return null;
};
