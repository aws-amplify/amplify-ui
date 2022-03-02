import {
  getActorState,
  getAliasInfoFromContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading, TextField } from '../../..';
import { RemoteErrorMessage, TwoButtonSubmitFooter } from '../shared';
import { useCustomComponents } from '../hooks/useCustomComponents';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
  propsCreator,
} from '../../../helpers/utils';

export const ResetPassword = (): JSX.Element => {
  const {
    components: {
      ResetPassword: {
        Header = ResetPassword.Header,
        Footer = ResetPassword.Footer,
      },
    },
  } = useCustomComponents();
  const { isPending, submitForm, updateForm, _state } = useAuthenticator();

  const formOverrides =
    getActorState(_state).context?.formFields?.resetPassword;

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
        <Header />

        <Flex direction="column">
          <TextField
            {...propsCreator('username', labelText, formOverrides, true)}
            autoComplete="username"
            name="username"
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
        <Footer />
      </fieldset>
    </form>
  );
};

ResetPassword.Header = () => {
  return <Heading level={3}>{translate('Reset your password')}</Heading>;
};

ResetPassword.Footer = (): JSX.Element => null;
