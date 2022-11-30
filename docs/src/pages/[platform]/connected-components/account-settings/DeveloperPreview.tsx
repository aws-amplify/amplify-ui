import { Alert } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export const DeveloperPreview = () => {
  const {
    query: { platform = 'react' },
  } = useRouter();
  if (platform !== 'react') return null;

  return (
    <Alert variation="info" heading="Developer Preview">
      Account Settings components are currently in developer preview.
    </Alert>
  );
};
