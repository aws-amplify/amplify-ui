// This file only exists to expose `Amplify` & its categories on `window` for e2e testing

// https://nextjs.org/docs/advanced-features/custom-app
import App from 'next/app';
import { Amplify } from 'aws-amplify';
import { Authenticator, AmplifyProvider } from '@aws-amplify/ui-react';

if (typeof window !== 'undefined') {
  window['Amplify'] = Amplify;
}

export default function MyApp(props) {
  return (
    <AmplifyProvider>
      <Authenticator.Provider>
        <App {...props} />
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
