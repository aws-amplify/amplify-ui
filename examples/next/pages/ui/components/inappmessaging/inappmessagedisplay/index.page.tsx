// import { Amplify } from 'aws-amplify';

// import '@aws-amplify/ui-react/styles.css';

// import awsExports from './aws-exports';
// import { InAppMessagingProvider, InAppMessageDisplay } from '@aws-amplify/ui-react';

// Amplify.configure(awsExports);

// export default function InAppMessaging() {
//   return (
//     <div>
//       <h2>Hi</h2>
//       <InAppMessagingProvider>
//         <InAppMessageDisplay></InAppMessageDisplay>
//       </InAppMessagingProvider>
//     </div>
//   )
// }

import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  InAppMessagingProvider,
  InAppMessageDisplay,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Heading, Text, useTheme } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

export default function App() {
  return (
    <div>
      <h2>Hi</h2>
      <InAppMessagingProvider>
        <Authenticator
          formFields={formFields}
          components={components}
          hideSignUp={true}
        >
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
        <InAppMessageDisplay />
      </InAppMessagingProvider>
    </div>
  );
}
