import { Alert, Link } from '@aws-amplify/ui-react';
import * as react from 'react';

export const Banner = () => (
  <Alert heading="Developer Preview" variation="warning">
    You're viewing documentation for the <code>@next</code> release of Amplify
    UI.
    <br />
    For the <code>@latest</code> stable release, visit{' '}
    <Link href="https://docs.amplify.aws/ui">https://docs.amplify.aws/ui</Link>.
  </Alert>
);
