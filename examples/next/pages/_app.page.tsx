import { AmplifyProvider } from '@aws-amplify/ui-react';

export default function ExampleApp({ Component, pageProps }) {
  console.log('Render');
  return (
    <AmplifyProvider>
      <Component {...pageProps} />
    </AmplifyProvider>
  );
}
