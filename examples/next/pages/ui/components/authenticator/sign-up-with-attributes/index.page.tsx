import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import { TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithAttributes() {
  return (
    <Authenticator
      initialState="signUp"
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Authenticator.SignUp.FormFields />
                <TextField label="Zone Info" name="zoneinfo" />
                <TextField label="Gender" name="gender" />
                <TextField
                  label="Updated At"
                  name="updated_at"
                  placeholder="1699880541"
                />
                <TextField label="Locale" name="locale" />
                <TextField label="Address" name="address" />
                <TextField label="Picture" name="picture" />
              </>
            );
          },
        },
        ForceNewPassword: {
          FormFields() {
            return (
              <>
                <Authenticator.ForceNewPassword.FormFields />
              </>
            );
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}
