import { Alert } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export const DeveloperPreview = () => {
  const {
    query: { platform = 'react' },
  } = useRouter();
  if (platform !== 'react-native' && platform !== 'android') return null;

  const platformName = {
    'react-native': 'React Native',
    'android': 'Android',
  }[platform];

  return (
    <Alert variation="info" heading="Developer Preview">
      The {platformName} Authenticator is currently in developer preview.
    </Alert>
  );
};
