import { Alert, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  Framework,
  FRAMEWORK_DISPLAY_NAMES,
  MAJOR_VERSIONS,
} from '../../data/frameworks';

export const ForgotPasswordRenameAlert = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const isReactNative = framework === 'react-native';
  const prevFrameworkVersion = MAJOR_VERSIONS[framework][1];

  if (isReactNative) {
    return (
      <Alert
        role="none"
        variation="info"
        heading={`${FRAMEWORK_DISPLAY_NAMES[framework]} ${prevFrameworkVersion}`}
      >
        <Text>
          Use <code>resetPassword</code> in place of <code>forgotPassword</code>{' '}
          in version {prevFrameworkVersion} of{' '}
          <code>@aws-amplify/ui-{framework}</code>.
        </Text>
      </Alert>
    );
  }

  return (
    <Alert
      role="none"
      variation="info"
      heading={`${FRAMEWORK_DISPLAY_NAMES[framework]} ${prevFrameworkVersion}`}
    >
      <Text>
        Use <code>resetPassword</code> in place of <code>forgotPassword</code>{' '}
        in versions {prevFrameworkVersion} and earlier of{' '}
        <code>@aws-amplify/ui-{framework}</code>.
      </Text>
    </Alert>
  );
};
