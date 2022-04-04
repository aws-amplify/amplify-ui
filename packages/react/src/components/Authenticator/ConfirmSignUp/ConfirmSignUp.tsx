import * as React from 'react';
import { translate } from '@aws-amplify/ui';
import classNames from 'classnames';
import { ComponentClassNames } from '../../../primitives/shared';

import { Button, Flex, Heading, Text } from '../../..';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';

import { RemoteErrorMessage } from '../shared';
import { FormFields } from '../shared/FormFields';

export function ConfirmSignUp() {
  const {
    isPending,
    resendCode,
    codeDeliveryDetails: { DeliveryMedium, Destination } = {},
  } = useAuthenticator();
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
    <form
      className={classNames(
        ComponentClassNames.AuthenticatorForm,
        ComponentClassNames.AuthenticatorSignUp
      )}
      data-amplify-form=""
      data-amplify-authenticator-confirmsignup=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        className={classNames(
          'amplify-flex',
          ComponentClassNames.AuthenticatorFieldSet
        )}
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <Text className={ComponentClassNames.AuthenticatorConfirmSignuUpText}>
            {subtitleText}
          </Text>

          <FormFields route="confirmSignUp" />

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
      </fieldset>
    </form>
  );
}

ConfirmSignUp.Header = () => {
  const { codeDeliveryDetails: { DeliveryMedium, Destination } = {} } =
    useAuthenticator();

  const confirmSignUpHeading =
    DeliveryMedium === 'EMAIL'
      ? translate('We Emailed You')
      : DeliveryMedium === 'SMS'
      ? translate('We Texted You')
      : translate('We Sent A Code');

  return (
    <Heading
      level={3}
      className={ComponentClassNames.AuthenticatorConfirmSignUpHeading}
    >
      {confirmSignUpHeading}
    </Heading>
  );
};

ConfirmSignUp.Footer = (): JSX.Element => null;
