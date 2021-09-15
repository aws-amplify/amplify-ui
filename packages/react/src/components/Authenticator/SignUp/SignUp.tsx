import { includes, isEmpty } from 'lodash';

import { I18n } from 'aws-amplify';
import {
  authInputAttributes,
  countryDialCodes,
  getActorContext,
  getActorState,
  SignUpContext,
  SignUpState,
  socialProviderLoginMechanisms,
} from '@aws-amplify/ui';

import { useAmplify, useAuth } from '../../../hooks';
import { FederatedSignIn } from '../FederatedSignIn';
import { RemoteErrorMessage } from '../shared';
export function SignUp() {
  const amplifyNamespace = 'Authenticator.SignUp';
  const {
    components: {
      Button,
      FieldGroup,
      Flex,
      Form,
      Heading,
      PasswordField,
      Text,
    },
  } = useAmplify(amplifyNamespace);

  const [_state, send] = useAuth();
  const actorState: SignUpState = getActorState(_state);
  const isPending = actorState.matches('signUp.pending');
  const { remoteError } = actorState.context;
  const { validationError } = getActorContext(_state) as SignUpContext;

  const [primaryAlias, ...secondaryAliases] = _state.context.config
    ?.login_mechanisms ?? ['username', 'email', 'phone_number'];

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
    send({
      type: 'CHANGE',
      data: { name, value },
    });
  };

  const passwordLabel = I18n.get('Password');
  const confirmPasswordLabel = I18n.get('Confirm Password');
  const passwordFieldClass = 'password-field';

  return (
    <Form
      data-amplify-authenticator-signup=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: 'SUBMIT',
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
      onChange={handleChange}
    >
      <Flex direction="column">
        <Heading level={3}>{I18n.get('Create a new account')}</Heading>

        <FieldGroup disabled={isPending} direction="column">
          <SignUp.AliasControl
            label={I18n.get(authInputAttributes[primaryAlias].label)}
            name={primaryAlias}
          />
          <PasswordField
            data-amplify-password
            className={passwordFieldClass}
            placeholder={passwordLabel}
            required
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
            required
            name="confirm_password"
            label={confirmPasswordLabel}
            labelHidden={true}
            autoComplete="new-password"
            hasError={!!validationError['confirm_password']}
          />

          {!!validationError['confirm_password'] && (
            <Text variation="error">{validationError['confirm_password']}</Text>
          )}

          {secondaryAliases
            .filter((alias) => !includes(socialProviderLoginMechanisms, alias))
            .map((alias) => (
              <SignUp.AliasControl
                key={alias}
                label={I18n.get(authInputAttributes[alias].label)}
                name={alias}
              />
            ))}

          <RemoteErrorMessage amplifyNamespace={amplifyNamespace} />
        </FieldGroup>

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

SignUp.AliasControl = ({
  label = I18n.get('Username'),
  name = 'username',
  placeholder = label,
}) => {
  const {
    components: { SelectField, TextField },
  } = useAmplify('Authenticator.SignUp.Alias');
  const [_state] = useAuth();
  const { validationError, formValues } = getActorContext(
    _state
  ) as SignUpContext;
  const error = validationError[name];

  return (
    <>
      {name === 'phone_number' && (
        <SelectField
          name="country_code"
          label="country code"
          labelHidden={true}
          defaultValue={formValues.country_code}
        >
          {countryDialCodes.map((dialCode) => (
            <option key={dialCode} value={dialCode}>
              {dialCode}
            </option>
          ))}
        </SelectField>
      )}
      <TextField
        type={authInputAttributes[name].type}
        name={name}
        required
        placeholder={placeholder}
        label={label}
        labelHidden={true}
        autoComplete="username"
        errorMessage={error}
      ></TextField>
    </>
  );
};
