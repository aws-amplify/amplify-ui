import { AmplifyProvider } from '@aws-amplify/ui-react';

export default function ExampleApp({ Component, pageProps }) {
  return (
    <AmplifyProvider>
      <Component {...pageProps} />
    </AmplifyProvider>
  );
}
