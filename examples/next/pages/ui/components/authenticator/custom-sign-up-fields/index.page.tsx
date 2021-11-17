import { Amplify } from 'aws-amplify';

import {
  // Access the default `Authenticator.SignUp.FormFields` for re-use
  Authenticator,
  // Amplify UI Primitives to simplify the custom fields
  CheckboxField,
  // React hook to get access to validation errors
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-email-and-custom-attributes/src/aws-exports';
Amplify.configure(awsExports);

export default function App({ signOut }) {
  return (
    <Authenticator
      // Default to Sign Up screen
      initialState="signUp"
      components={{
        // Customize `Authenticator.SignUp.FormFields`
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
              <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />

                {/* Append & require Terms & Conditions field to sign up  */}
                <CheckboxField
                  errorMessage={validationErrors.acknowledgement}
                  hasError={!!validationErrors.acknowledgement}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms & Conditions"
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
              acknowledgement: 'You must agree to the Terms & Conditions',
            };
          }
        },
      }}
    >
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
