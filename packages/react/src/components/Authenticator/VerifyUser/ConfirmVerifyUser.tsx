import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Flex, Form, Heading } from '../../..';
import {
  ConfirmationCodeInput,
  RemoteErrorMessage,
  TwoButtonSubmitFooter,
} from '../shared';

export const ConfirmVerifyUser = (): JSX.Element => {
  const { submitForm, updateForm } = useAuthenticator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

    updateForm({ name, value });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-confirmverifyuser=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>
          {I18n.get('Account recovery requires verified contact information')}
        </Heading>

        <Flex direction="column">
          <ConfirmationCodeInput />
        </Flex>

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={I18n.get('Skip')}
          cancelButtonSendType="SKIP"
        />
      </Flex>
    </Form>
  );
};
