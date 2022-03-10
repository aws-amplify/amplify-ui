import { translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Button, Heading, Text } from '../../..';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { FormFields } from '../shared/FormFields';

export const ForceNewPassword = (): JSX.Element => {
  const { error, isPending, toSignIn, submitForm, updateForm, updateBlur } =
    useAuthenticator();

  const {
    components: {
      ForceNewPassword: { FormFields = ForceNewPassword.FormFields },
    },
  } = useCustomComponents();

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

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
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
      onBlur={handleBlur}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Heading level={3}>{translate('Change Password')}</Heading>

        <FormFields />
        {error && (
          <Text className="forceNewPasswordErrorText" variation="error">
            {error}
          </Text>
        )}
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

ForceNewPassword.FormFields = () => <FormFields route="forceNewPassword" />;
