import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import { Divider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { SimpleProfilePage } from './SimpleProfilePage';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function AuthenticatorWithAttributeManagement() {
  return (
    <Authenticator
      signUpAttributes={[
        'birthdate',
        'family_name',
        'preferred_username',
        'nickname',
        'middle_name',
        'phone_number',
      ]}
    >
      {({ signOut, user }) => (
        <main>
          <div>
            <button onClick={signOut}>Sign Out</button>
          </div>
          <Divider
            size="large"
            style={{
              borderBottom: '10px solid navy',
              borderBlockStyle: 'groove',
            }}
          />
          <SimpleProfilePage />
        </main>
      )}
    </Authenticator>
  );
}
