import React from 'react';
import { translate } from '@aws-amplify/ui';

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

export function ConfirmSignUp({
  className,
  variation,
}: RouteProps): JSX.Element {
  const {
    isPending,
    resendCode,
    codeDeliveryDetails: { DeliveryMedium, Destination } = {},
  } = useAuthenticator((context) => [
    context.isPending,
    context.resendCode,
    context.codeDeliveryDetails,
  ]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmSignUp: {
        Header = ConfirmSignUp.Header,
        Footer = ConfirmSignUp.Footer,
      },
    },
  } = useCustomComponents();

  const emailMessage = translate(
    'Your code is on the way. To log in, enter the code we emailed to'
  );
  const textedMessage = translate(
    'Your code is on the way. To log in, enter the code we texted to'
  );
  const defaultMessage = translate(
    'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.'
  );

  const minutesMessage = translate('It may take a minute to arrive.');

  const subtitleText =
    DeliveryMedium === 'EMAIL'
      ? `${emailMessage} ${Destination}. ${minutesMessage}`
      : DeliveryMedium === 'SMS'
      ? `${textedMessage} ${Destination}. ${minutesMessage}`
      : translate(`${defaultMessage}`);

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
              {subtitleText}
            </Text>

            <FormFields />

            <RemoteErrorMessage />

            <Button
              variation="primary"
              isDisabled={isPending}
              type="submit"
              loadingText={translate('Confirming')}
              isLoading={isPending}
              fontWeight="normal"
            >
              {translate('Confirm')}
            </Button>

            <Button onClick={resendCode} type="button" fontWeight="normal">
              {translate('Resend Code')}
            </Button>
          </Flex>
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
}

const DefaultHeader = () => {
  const { codeDeliveryDetails: { DeliveryMedium } = {} } = useAuthenticator(
    (context) => [context.codeDeliveryDetails]
  );

  const confirmSignUpHeading =
    DeliveryMedium === 'EMAIL'
      ? translate('We Emailed You')
      : DeliveryMedium === 'SMS'
      ? translate('We Texted You')
      : translate('We Sent A Code');

  return <Heading level={4}>{confirmSignUpHeading}</Heading>;
};

ConfirmSignUp.Header = DefaultHeader;

ConfirmSignUp.Footer = function Footer(): JSX.Element {
  return null;
};
