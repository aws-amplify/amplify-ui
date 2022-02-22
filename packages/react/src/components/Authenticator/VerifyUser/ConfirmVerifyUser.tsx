import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';

export const ConfirmVerifyUser = (): JSX.Element => {
  const { submitForm, updateForm, isPending } = useAuthenticator();

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
    submitForm(getFormDataFromEvent(event));
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Heading level={3}>
          {translate('Account recovery requires verified contact information')}
        </Heading>

        <Flex direction="column">
          <ConfirmationCodeInput />
        </Flex>

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
        />
      </fieldset>
    </form>
  );
};
