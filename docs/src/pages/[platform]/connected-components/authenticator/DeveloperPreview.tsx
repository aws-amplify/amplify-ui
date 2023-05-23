import { Alert } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export const DeveloperPreview = () => {
  const {
    query: { platform = 'react' },
  } = useRouter();
  if (platform !== 'react-native' && platform !== 'android') return null;

  const devPlatformName =
    platform === 'react-native' ? 'React Native' : 'Android';

  return (
    <Alert variation="info" heading="Developer Preview">
      The {devPlatformName} Authenticator is currently in developer preview.
    </Alert>
  );
};
