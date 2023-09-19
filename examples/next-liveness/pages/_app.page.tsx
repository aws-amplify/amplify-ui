// This file only exists to expose `Amplify` & its categories on `window` for e2e testing

// https://nextjs.org/docs/advanced-features/custom-app
import App from 'next/app';
import { AmplifyProvider } from '@aws-amplify/ui-react';

export default function MyApp(props: any) {
  return (
    <AmplifyProvider>
      <App {...props} />
    </AmplifyProvider>
  );
}
