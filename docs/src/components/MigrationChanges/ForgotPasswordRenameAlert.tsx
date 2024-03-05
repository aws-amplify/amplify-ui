import { Alert, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Framework, PREV_MAJOR_VERSIONS } from '../../data/frameworks';

export const ForgotPasswordRenameAlert = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const isReactNative = framework === 'react-native';
  const prevFrameworkVersion = PREV_MAJOR_VERSIONS[framework];

  const textContent = isReactNative ? (
    <Text>
      Use <code>resetPassword</code> in place of <code>forgotPassword</code> in
      version {prevFrameworkVersion} of <code>@aws-amplify/ui-{framework}</code>
      .
    </Text>
  ) : (
    <Text>
      Use <code>resetPassword</code> in place of <code>forgotPassword</code> in
      versions {prevFrameworkVersion} and earlier of{' '}
      <code>@aws-amplify/ui-{framework}</code>.
    </Text>
  );
  return (
    <Alert
      role="none"
      variation="info"
      heading={`ui-${framework}@${prevFrameworkVersion}.x`}
    >
      {textContent}
    </Alert>
  );
};
