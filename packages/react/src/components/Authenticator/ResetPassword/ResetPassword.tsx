import { getAliasInfoFromContext, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading, TextField } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';

export const ResetPassword = (): JSX.Element => {
  const { isPending, submitForm, updateForm, _state } = useAuthenticator();

  const { label } = getAliasInfoFromContext(_state.context);
  const labelText = `Enter your ${label.toLowerCase()}`;

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
      data-amplify-authenticator-resetpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Heading level={3}>{translate('Reset your password')}</Heading>

        <Flex direction="column">
          <TextField
            autoComplete="username"
            name="username"
            placeholder={translate<string>(labelText)}
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
      </fieldset>
    </form>
  );
};
