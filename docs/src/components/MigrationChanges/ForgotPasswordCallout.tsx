import { Alert, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Framework, PREV_MAJOR_VERSIONS } from '../../data/frameworks';

export const ForgotPasswordCallout = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const isReactNative = framework === 'react-native';
  const prevFrameworkVersion = PREV_MAJOR_VERSIONS[framework];

  return (
    <Alert
      role="none"
      variation="info"
      heading={`@aws-amplify/ui-${framework}@${prevFrameworkVersion}.x`}
    >
      <Text>
        Use <code>resetPassword</code> in place of <code>forgotPassword</code>{' '}
        in version{isReactNative ? '' : 's'} {prevFrameworkVersion}{' '}
        {isReactNative ? '' : 'and earlier of'} of{' '}
        <code>@aws-amplify/ui-{framework}</code>.
      </Text>
    </Alert>
  );
};
