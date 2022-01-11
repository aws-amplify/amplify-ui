import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { Button, Flex, Heading, Text } from '../../..';
import { isInputOrSelectElement, isInputElement } from '../../../helpers/utils';

import {
  ConfirmationCodeInput,
  ConfirmationCodeInputProps,
  RemoteErrorMessage,
} from '../shared';

export function ConfirmSignUp() {
  const {
    isPending,
    resendCode,
    submitForm,
    updateForm,
    codeDeliveryDetails: { DeliveryMedium, Destination } = {},
  } = useAuthenticator();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  const confirmationCodeInputProps: ConfirmationCodeInputProps = {
    label: translate('Confirmation Code'),
    placeholder: translate('Enter your code'),
  };

  const confirmSignUpHeading =
    DeliveryMedium === 'EMAIL'
      ? translate('We Emailed You')
      : DeliveryMedium === 'SMS'
      ? translate('We Texted You')
      : translate('We Sent A Code');
  const subtitleText =
    DeliveryMedium === 'EMAIL'
      ? `Your code is on the way. To log in, enter the code we emailed to ${Destination}. It may take a minute to arrive.`
      : DeliveryMedium === 'SMS'
      ? `Your code is on the way. To log in, enter the code we texted to ${Destination}. It may take a minute to arrive.`
      : translate(
          `Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.`
        );

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmsignup=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Heading level={3} style={{ fontSize: '1.5rem' }}>
          {confirmSignUpHeading}
        </Heading>

        <Flex direction="column">
          <Text style={{ marginBottom: '1rem' }}>{subtitleText}</Text>
          <ConfirmationCodeInput {...confirmationCodeInputProps} />

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
      </fieldset>
    </form>
  );
}
