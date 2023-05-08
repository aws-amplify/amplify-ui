import { Alert } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

export const DeveloperPreview = () => {
  const {
    query: { platform = 'react' },
  } = useRouter();
  if (
    platform !== 'react-native' &&
    platform !== 'android' &&
    platform !== 'swift'
  )
    return null;

  const devPlatformName =
    platform === 'react-native'
      ? 'React Native'
      : platform === 'android'
      ? 'Android'
      : 'Swift';

  return (
    <Alert variation="info" heading="Developer Preview">
      The {devPlatformName} Authenticator is currently in developer preview.
    </Alert>
  );
};
