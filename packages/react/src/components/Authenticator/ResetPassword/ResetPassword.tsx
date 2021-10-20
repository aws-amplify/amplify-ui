import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, TextField } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

export const ResetPassword = (): JSX.Element => {
  const { isPending, submitForm, updateForm } = useAuthenticator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <Form
      data-amplify-authenticator-resetpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Reset your password')}</Heading>

        <Flex direction="column">
          <TextField
            autoComplete="username"
            name="username"
            placeholder={I18n.get('Enter your username')}
            label={I18n.get('Enter your username')}
            labelHidden={true}
            required={true}
            type="username"
          />
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonText={I18n.get('Back to Sign In')}
          cancelButtonSendType="SIGN_IN"
          submitButtonText={
            isPending ? (
              <>{I18n.get('Sending')}&hellip;</>
            ) : (
              <>{I18n.get('Send code')}</>
            )
          }
        />
      </Flex>
    </Form>
  );
};
