import { Alert, Link, Text } from '@aws-amplify/ui-react';

const AppDirectoryAlert = () => (
  <Alert variation="info" role="none">
    <Text>
      Next.js 13.4+ introduces{' '}
      <Link href="https://nextjs.org/docs/app/building-your-application/routing#the-app-directory">
        App Router
      </Link>{' '}
      with the usage of{' '}
      <Link href="https://nextjs.org/docs/getting-started/react-essentials#server-components">
        Server Components.
      </Link>{' '}
      Amplify UI components are interactive and designed to work on the client
      side. To use them inside of Server Components you must wrap them in a
      Client Component with <code>&quot;use client&quot;</code>. For more info,
      visit{' '}
      <Link href="https://nextjs.org/docs/getting-started/react-essentials#third-party-packages">
        Next.js third party package documentation.
      </Link>
    </Text>
    <Text paddingTop="relative.small">
      If you are using{' '}
      <Link href="https://nextjs.org/docs/pages/building-your-application/routing">
        Next.js Pages Router,
      </Link>{' '}
      no changes are required to use Amplify UI components.
    </Text>
  </Alert>
);
export default AppDirectoryAlert;
