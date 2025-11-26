import { Alert, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Framework, AMPLIFY_5_UI_VERSIONS } from '../../data/frameworks';

export const ForgotPasswordCallout = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const isReactNative = framework === 'react-native';
  let amplify5FrameworkVersion = null;
  if (framework in AMPLIFY_5_UI_VERSIONS) {
    amplify5FrameworkVersion = AMPLIFY_5_UI_VERSIONS[framework];
  }

  if (!amplify5FrameworkVersion) return null;

  return (
    <Alert
      role="none"
      variation="info"
      heading={`@aws-amplify/ui-${framework} v${amplify5FrameworkVersion}`}
    >
      <Text>
        Use <code>resetPassword</code> in place of <code>forgotPassword</code>{' '}
        in version{isReactNative ? '' : 's'} {amplify5FrameworkVersion}{' '}
        {isReactNative ? '' : 'and earlier of '}
        <code>@aws-amplify/ui-{framework}</code>.
      </Text>
    </Alert>
  );
};
