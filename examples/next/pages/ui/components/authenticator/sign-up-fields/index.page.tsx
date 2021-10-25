import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  CheckboxField,
  Link,
  TextField,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-email-and-custom-attributes/src/aws-exports';
Amplify.configure(awsExports);

function App({ signOut }) {
  return <button onClick={signOut}>Sign out</button>;
}

export default withAuthenticator(App, {
  initialState: 'signUp',
  loginMechanisms: ['email'],
  components: {
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            <TextField
              label="Preferred Username"
              labelHidden={true}
              name="preferred_username"
              placeholder="Preferred Username"
            />
            <Authenticator.SignUp.FormFields />
            <CheckboxField
              errorMessage={validationErrors.acknowledgement}
              hasError={!!validationErrors.acknowledgement}
              name="acknowledgement"
              value="yes"
            >
              I agree with the <Link href="#">Terms & Conditions</Link>
            </CheckboxField>
          </>
        );
      },
    },
  },
  services: {
    async validateSignUp(formData) {
      // TODO How to do other validations?
      if (!formData.acknowledgement) {
        return Promise.reject({
          acknowledgement: 'You must agree to the Terms & Conditions',
        });
      }
    },
  },
});
