import React, { Suspense } from 'react';
import { Text } from 'react-native';

import { LaunchArguments } from 'react-native-launch-arguments';

import { EXAMPLE_APP_NAME } from '@env';

// prefer launch argument passed from Detox, then local .env file
const getExampleAppName = () =>
  LaunchArguments.value().EXAMPLE_APP_NAME ?? EXAMPLE_APP_NAME;

/**
 * `Authenticator` Example and Demo Apps
 */
const DemoExample = React.lazy(
  () => import('../features/Authenticator/Demo/Example')
);
const BasicExample = React.lazy(
  () => import('../features/Authenticator/Basic/Example')
);
const ComponentExample = React.lazy(
  () => import('../features/Authenticator/Component/Example')
);
const ComponentSlotsExample = React.lazy(
  () => import('../features/Authenticator/ComponentSlots/Example')
);
const FieldsExample = React.lazy(
  () => import('../features/Authenticator/Fields/Example')
);
const LabelHiddenExample = React.lazy(
  () => import('../features/Authenticator/LabelHidden/Example')
);
const SlotsExample = React.lazy(
  () => import('../features/Authenticator/Slots/Example')
);
const StylesExample = React.lazy(
  () => import('../features/Authenticator/Styles/Example')
);
const EmailMfaExample = React.lazy(
  () => import('../features/Authenticator/EmailMfa/Example')
);
const OverrideComponents = React.lazy(
  () => import('../features/Authenticator/OverrideComponents/Example')
);

/**
 * `InAppMessaging` Example and Demo Apps
 */
const InAppMessaging = React.lazy(
  () => import('../features/InAppMessaging/Demo/Example')
);

/**
 * `Theming` Example and Demo Apps
 */

const ThemingExample = React.lazy(
  () => import('../features/Theming/Basic/Example')
);
const DarkModeExample = React.lazy(
  () => import('../features/Theming/DarkMode/Example')
);

/**
 * `Authenticator` e2e Apps
 */
const SignInTotpMfa = React.lazy(
  () => import('../ui/components/authenticator/sign-in-totp-mfa/Example')
);
const SignInWithEmail = React.lazy(
  () => import('../ui/components/authenticator/sign-in-with-email/Example')
);
const SignInWithPhone = React.lazy(
  () => import('../ui/components/authenticator/sign-in-with-phone/Example')
);
const SignInWithUsername = React.lazy(
  () => import('../ui/components/authenticator/sign-in-with-username/Example')
);
const SignUpWithAttributes = React.lazy(
  () => import('../ui/components/authenticator/sign-up-with-attributes/Example')
);
const SignUpWithEmail = React.lazy(
  () => import('../ui/components/authenticator/sign-up-with-email/Example')
);
const SignUpWithPhone = React.lazy(
  () => import('../ui/components/authenticator/sign-up-with-phone/Example')
);
const SignUpWithUsername = React.lazy(
  () => import('../ui/components/authenticator/sign-up-with-username/Example')
);
const SocialProviders = React.lazy(
  () => import('../ui/components/authenticator/social-providers/Example')
);
const ForgotPassword = React.lazy(
  () => import('../ui/components/authenticator/forgot-password/Example')
);
const WithAuthenticator = React.lazy(
  () => import('../ui/components/authenticator/with-authenticator/Example')
);
const SignInWithEmailMfa = React.lazy(
  () => import('../ui/components/authenticator/sign-in-with-email-mfa/Example')
);
const SignInWithEmailMfaSelection = React.lazy(
  () =>
    import(
      '../ui/components/authenticator/sign-in-with-email-mfa-selection/Example'
    )
);
const SignInWithEmailMfaSetupSelection = React.lazy(
  () =>
    import(
      '../ui/components/authenticator/sign-in-with-email-mfa-setup-selection/Example'
    )
);

export const ExampleComponent = () => {
  const appName = getExampleAppName();

  console.log(`Running Example App: ${appName}`);

  switch (appName) {
    case 'DemoExample':
      return <DemoExample />;
    case 'BasicExample':
      return <BasicExample />;
    case 'ComponentExample':
      return <ComponentExample />;
    case 'ComponentSlotsExample':
      return <ComponentSlotsExample />;
    case 'FieldsExample':
      return <FieldsExample />;
    case 'LabelHiddenExample':
      return <LabelHiddenExample />;
    case 'SlotsExample':
      return <SlotsExample />;
    case 'StylesExample':
      return <StylesExample />;
    case 'InAppMessaging':
      return <InAppMessaging />;
    case 'ThemingExample':
      return <ThemingExample />;
    case 'DarkModeExample':
      return <DarkModeExample />;
    case 'EmailMfaExample':
      return <EmailMfaExample />;
    case 'OverrideComponents':
      return <OverrideComponents />;

    // Detox-Cucumber e2e tests
    // below apps are not meant to be run as example apps, they are part of integration testing in CI
    case 'ui/components/authenticator/sign-in-totp-mfa':
      return <SignInTotpMfa />;
    case '/ui/components/authenticator/sign-in-with-email':
      return <SignInWithEmail />;
    case '/ui/components/authenticator/sign-in-with-username':
      return <SignInWithUsername />;
    case 'ui/components/authenticator/sign-in-with-phone':
      return <SignInWithPhone />;
    case 'ui/components/authenticator/sign-up-with-email':
      return <SignUpWithEmail />;
    case 'ui/components/authenticator/sign-up-with-phone/':
      return <SignUpWithPhone />;
    case 'ui/components/authenticator/sign-up-with-username':
      return <SignUpWithUsername />;
    case 'ui/components/authenticator/sign-up-with-attributes':
      return <SignUpWithAttributes />;
    case 'SocialProviders':
    case '/ui/components/authenticator/social-providers':
      return <SocialProviders />;
    case 'ui/components/authenticator/forgot-password':
      return <ForgotPassword />;
    case '/ui/components/authenticator/withAuthenticator':
      return <WithAuthenticator />;
    case 'ui/components/in-app-messaging/demo':
      return <InAppMessaging />;
    case 'ui/components/authenticator/sign-in-with-email-mfa':
      return <SignInWithEmailMfa />;
    case 'ui/components/authenticator/sign-in-with-email-mfa-selection':
      return <SignInWithEmailMfaSelection />;
    case 'ui/components/authenticator/sign-in-with-email-mfa-setup-selection':
      return <SignInWithEmailMfaSetupSelection />;
    default:
      console.warn(
        'EXAMPLE_APP_NAME environment variable not configured correctly, running default example app'
      );
      return null;
  }
};

function Example() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ExampleComponent />
    </Suspense>
  );
}

export default Example;
