import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  CheckboxField,
  useAuthenticator,
} from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator
      // Default to Sign Up screen
      initialState="signUp"
      // Customize `Authenticator.SignUp.FormFields`
      components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
              <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />

                {/* Append & require Terms and Conditions field to sign up  */}
                <CheckboxField
                  errorMessage={validationErrors.acknowledgement as string}
                  hasError={!!validationErrors.acknowledgement}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms and Conditions"
                />
              </>
            );
          },
        },
      }}
      services={{
        async validateCustomSignUp(formData) {
          if (!formData.acknowledgement) {
            return {
              acknowledgement: 'You must agree to the Terms and Conditions',
            };
          }
        },
      }}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
