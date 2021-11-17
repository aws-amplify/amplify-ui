import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';
import { isInputTarget } from '../../../helpers/utils';

export const ConfirmVerifyUser = (): JSX.Element => {
  const { submitForm, updateForm } = useAuthenticator();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputTarget(event.target)) {
      let { checked, name, type, value } = event.target;
      if (type === 'checkbox' && !checked) value = undefined;

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
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
      </Flex>
    </form>
  );
};
