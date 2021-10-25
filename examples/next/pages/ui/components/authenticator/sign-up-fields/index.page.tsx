import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  CheckboxField,
  Link,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
Amplify.configure(awsExports);

function App({ signOut }) {
  return <button onClick={signOut}>Sign out</button>;
}

export default withAuthenticator(App, {
  initialState: 'signUp',
  components: {
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            <Authenticator.SignUp.FormFields />
            <CheckboxField
              errorMessage={validationErrors.acknowledgement}
              hasError={validationErrors.acknowledgement}
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
    async validateSignUp(context, _event) {
      // TODO How to do other validations?
      if (!context.formValues.acknowledgement) {
        return Promise.reject({
          acknowledgement: 'You must agree to the Terms & Conditions',
        });
      }
    },
  },
});
