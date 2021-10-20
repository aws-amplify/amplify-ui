import { getActorContext, SignInContext } from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';

import { useAuthenticator } from '..';
import { Button, Flex, Form, Heading, PasswordField, Text } from '../../..';

export const ForceNewPassword = (): JSX.Element => {
  const {
    _state,
    error,
    isPending,
    signIn,
    submitForm,
    updateForm,
  } = useAuthenticator();
  const { validationError } = getActorContext(_state) as SignInContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  return (
    <Form
      data-amplify-authenticator-forcenewpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={(event) => {
        event.preventDefault();
        submitForm();
      }}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Change Password')}</Heading>

        <Flex direction="column">
          <PasswordField
            data-amplify-password
            placeholder={I18n.get('Password')}
            required
            name="password"
            label={I18n.get('Password')}
            labelHidden={true}
            hasError={!!validationError['confirm_password']}
          />
          <PasswordField
            data-amplify-confirmpassword
            placeholder={I18n.get('Confirm Password')}
            required
            name="confirm_password"
            label={I18n.get('Confirm Password')}
            labelHidden={true}
            hasError={!!validationError['confirm_password']}
          />

          {!!validationError['confirm_password'] && (
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}
        </Flex>

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
          loadingText={I18n.get('Changing')}
          fontWeight="normal"
        >
          {I18n.get('Change Password')}
        </Button>
        <Button
          onClick={signIn}
          type="button"
          fontWeight="normal"
          variation="link"
          size="small"
        >
          {I18n.get('Back to Sign In')}
        </Button>
      </Flex>
    </Form>
  );
};
