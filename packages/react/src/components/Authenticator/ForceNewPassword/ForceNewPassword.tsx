import {
  getActorContext,
  getActorState,
  SignInContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Flex, Heading, PasswordField, Text } from '../../..';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
  propsCreator,
} from '../../../helpers/utils';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { FormFields } from './FormFields';

export const ForceNewPassword = (): JSX.Element => {
  const {
    _state,
    error,
    isPending,
    toSignIn,
    submitForm,
    updateForm,
    updateBlur,
  } = useAuthenticator();

  const {
    components: {
      ForceNewPassword: { FormFields = ForceNewPassword.FormFields },
    },
  } = useCustomComponents();

  const formOverrides =
    getActorState(_state).context?.formFields?.forceNewPassword;

  const { validationError } = getActorContext(_state) as SignInContext;
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-forcenewpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Heading level={3}>{translate('Change Password')}</Heading>

        <Flex direction="column">
          <PasswordField
            data-amplify-password
            {...propsCreator('password', 'Password', formOverrides, true)}
            name="password"
            hasError={!!validationError['confirm_password']}
            onBlur={handleBlur}
          />
          <PasswordField
            data-amplify-confirmpassword
            {...propsCreator(
              'confirm_password',
              'Confirm Password',
              formOverrides,
              true
            )}
            name="confirm_password"
            hasError={!!validationError['confirm_password']}
            onBlur={handleBlur}
          />

          {!!validationError['confirm_password'] && (
            <Text role="alert" variation="error">
              {translate(validationError['confirm_password'] as string)}
            </Text>
          )}
        </Flex>

        {error && (
          <Text className="forceNewPasswordErrorText" variation="error">
            {error}
          </Text>
        )}

        <FormFields></FormFields>
        <Button
          isDisabled={isPending}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={translate('Changing')}
          fontWeight="normal"
        >
          {translate('Change Password')}
        </Button>
        <Button
          onClick={toSignIn}
          type="button"
          fontWeight="normal"
          variation="link"
          size="small"
        >
          {translate('Back to Sign In')}
        </Button>
      </fieldset>
    </form>
  );
};

ForceNewPassword.FormFields = FormFields;
