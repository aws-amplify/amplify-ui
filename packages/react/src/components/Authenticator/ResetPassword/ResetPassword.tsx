import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Form, Heading, TextField } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';

export const ResetPassword = (): JSX.Element => {
  const { isPending, submitForm, updateForm } = useAuthenticator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { checked, name, type, value } = event.target;
    if (type === 'checkbox' && !checked) value = undefined;

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
        <Heading level={3}>{translate('Reset your password')}</Heading>

        <Flex direction="column">
          <TextField
            autoComplete="username"
            name="username"
            placeholder={translate('Enter your username')}
            label={translate('Enter your username')}
            labelHidden={true}
            required={true}
            type="username"
          />
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonText={translate('Back to Sign In')}
          cancelButtonSendType="SIGN_IN"
          submitButtonText={
            isPending ? (
              <>{translate('Sending')}&hellip;</>
            ) : (
              <>{translate('Send code')}</>
            )
          }
        />
      </Flex>
    </Form>
  );
};
