import { Alert, Link } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import * as react from 'react';

export const Banner = () => {
  const router = useRouter();
  const { platform = 'react' } = router.query;

  return (
    <Alert
      heading={
        <>
          Developer Preview
          <br />
          <a href="https://www.npmjs.com/package/@aws-amplify/ui/v/next">
            <img src="https://img.shields.io/badge/npm-%40next-blue.svg" />
          </a>
        </>
      }
      variation="warning"
    >
      You're viewing documentation for the <code>@next</code> release of Amplify
      UI.
      <br />
      For the <code>@latest</code> stable release, visit{' '}
      <Link href="https://docs.amplify.aws/ui">
        https://docs.amplify.aws/ui
      </Link>
      .
    </Alert>
  );
};
