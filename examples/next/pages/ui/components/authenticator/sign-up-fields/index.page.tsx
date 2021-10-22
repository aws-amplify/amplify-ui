import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  CheckboxField,
  Link,
  withAuthenticator,
} from '@aws-amplify/ui-react';
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
      FormFields: () => (
        <>
          <Authenticator.SignUp.FormFields />
          <CheckboxField name="acknowledgement" value="yes">
            I agree with the <Link href="#">Terms & Conditions</Link>
          </CheckboxField>
        </>
      ),
    },
  },
  services: {
    validateSignUp(formData) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms & Conditions',
        };
      }
    },
  },
});
