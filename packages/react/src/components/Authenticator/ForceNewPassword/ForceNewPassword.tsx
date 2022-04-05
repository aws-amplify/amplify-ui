import { translate } from '@aws-amplify/ui';

import { Button, Heading, Text } from '../../..';
import {
  useAuthenticator,
  useCustomComponents,
  useFormHandlers,
} from '../hooks';
import { FormFields } from '../shared/FormFields';

export const ForceNewPassword = (): JSX.Element => {
  const { error, isPending, toSignIn } = useAuthenticator((context) => [
    context.error,
    context.isPending,
    context.toSignIn,
  ]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ForceNewPassword: { FormFields = ForceNewPassword.FormFields },
    },
  } = useCustomComponents();

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
