import { Amplify } from 'aws-amplify';

import { Authenticator, TextField } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithAttributes() {
  return (
    <Authenticator
      initialState="signUp"
      components={{
        ForceNewPassword: {
          FormFields() {
            return (
              <>
                <Authenticator.ForceNewPassword.FormFields />
                <TextField
                  label="Zone Info"
                  id="12233"
                  placeholder="Zone Info"
                  name="zoneinfo"
                  type="text"
                ></TextField>
              </>
            );
          },
        },
      }}
    >
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
