import { Amplify } from 'aws-amplify';

import {
  PasswordField,
  PhoneNumberField,
  TextField,
  Text,
  useAuthenticator,
  Authenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

/**
 * TODO: Introduce and use new API for setting default region code.
 * For now, we're using Slots to mock default region code manually.
 */
const components = {
  SignUp: {
    FormFields() {
      const { updateBlur, validationErrors } = useAuthenticator();
      return (
        <>
          <PhoneNumberField
            autoComplete="username"
            countryCodeName="country_code"
            defaultCountryCode="+44"
            onCountryCodeChange={(e) => console.log(e.target.value)}
            isRequired
            label={'Phone Number'}
            name="phone_number"
            labelHidden={true}
            placeholder={'Phone Number'}
          />
          <PasswordField
            autoComplete="new-password"
            data-amplify-password
            hasError={!!validationErrors['confirm-password']}
            isRequired
            name="password"
            label={'Password'}
            labelHidden={true}
            placeholder={'Password'}
          />
          <PasswordField
            autoComplete="new-password"
            data-amplify-confirmpassword
            hasError={!!validationErrors['confirm-password']}
            isRequired
            name="confirm_password"
            label={'Confirm Password'}
            labelHidden={true}
            placeholder={'Confirm Password'}
          />

          {validationErrors.confirm_password && (
            <Text role="alert" variation="error">
              {validationErrors.confirm_password}
            </Text>
          )}
          <TextField
            label="Email"
            labelHidden={true}
            name={'email'}
            required
            placeholder={'Email'}
            isRequired
            type={'email'}
          />
        </>
      );
    },
  },
};

function App({ signOut }) {
  return <button onClick={signOut}>Sign out</button>;
}

export default () => (
  <Authenticator initialState="signUp" components={components}>
    {({ signOut }) => <button onClick={signOut}>Sign out</button>}
  </Authenticator>
);
