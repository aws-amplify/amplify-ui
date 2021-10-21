import {
  getActorContext,
  SignUpContext,
  UserNameAlias,
  userNameAliasArray,
} from '@aws-amplify/ui';
import { I18n } from 'aws-amplify';
import { isEmpty } from 'lodash';

import { useAuthenticator } from '..';
import { Button, Flex, Form, Heading, PasswordField, Text } from '../../..';
import { FederatedSignIn } from '../FederatedSignIn';
import {
  RemoteErrorMessage,
  UserNameAlias as UserNameAliasComponent,
} from '../shared';

export function SignUp() {
  const { _state, isPending, submitForm, updateForm } = useAuthenticator();
  const { validationError } = getActorContext(_state) as SignUpContext;

  const [primaryAlias, ...secondaryAliases] =
    _state.context.config?.login_mechanisms?.filter(
      (alias: any): alias is UserNameAlias => userNameAliasArray.includes(alias)
    ) ?? userNameAliasArray;

  /**
   * If the login_mechanisms are configured to use ONLY username, we need
   * to ask for some sort of secondary contact information in order to
   * verify the user for Cognito. Currently matching this to how Vue is
   * set up.
   */
  if (primaryAlias === 'username' && isEmpty(secondaryAliases)) {
    secondaryAliases.push('email', 'phone_number');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateForm({ name, value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm();
  };

  const passwordLabel = I18n.get('Password');
  const confirmPasswordLabel = I18n.get('Confirm Password');
  const passwordFieldClass = 'password-field';

  return (
    <Form
      data-amplify-authenticator-signup=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Create a new account')}</Heading>

        <Flex direction="column">
          <UserNameAliasComponent
            data-amplify-usernamealias
            alias={primaryAlias}
          />
          <PasswordField
            data-amplify-password
            className={passwordFieldClass}
            placeholder={passwordLabel}
            isRequired={true}
            name="password"
            label={passwordLabel}
            labelHidden={true}
            autoComplete="new-password"
            hasError={!!validationError['confirm_password']}
          />
          <PasswordField
            data-amplify-confirmpassword
            className={passwordFieldClass}
            placeholder={confirmPasswordLabel}
            isRequired={true}
            name="confirm_password"
            label={confirmPasswordLabel}
            labelHidden={true}
            autoComplete="new-password"
            hasError={!!validationError['confirm_password']}
          />

          {!!validationError['confirm_password'] && (
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}

          {secondaryAliases.map((alias: UserNameAlias) => (
            <UserNameAliasComponent
              data-amplify-usernamealias
              key={alias}
              alias={alias}
            />
          ))}

          <RemoteErrorMessage />
        </Flex>

        <Button
          borderRadius={0}
          isDisabled={isPending}
          isFullWidth={true}
          type="submit"
          variation="primary"
          isLoading={isPending}
          loadingText={I18n.get('Creating Account')}
          fontWeight="normal"
        >
          {I18n.get('Create Account')}
        </Button>

        <FederatedSignIn />
      </Flex>
    </Form>
  );
}

SignUp.Header = null;
SignUp.Form = null;
SignUp.FormFields = null;
SignUp.SubmitButton = null;
SignUp.SocialButtons = null;
