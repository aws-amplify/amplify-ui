import React, { Suspense } from 'react';
import { Text } from 'react-native';

import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { LaunchArguments } from 'react-native-launch-arguments';

import { EXAMPLE_APP_NAME } from '@env';

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
const ResetPassword = React.lazy(
  () => import('../ui/components/authenticator/reset-password/Example')
);
const WithAuthenticator = React.lazy(
  () => import('../ui/components/authenticator/with-authenticator/Example')
);

const logger = new Logger('RNExample-logger');

export const ExampleComponent = () => {
  // .env file or launch argument passed from Detox
  const APP = EXAMPLE_APP_NAME ?? LaunchArguments.value().EXAMPLE_APP_NAME;
  switch (APP) {
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

    // Detox-Cucumber e2e tests
    // below apps are not meant to be run as example apps, they are part of integration testing in CI
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
    case 'ui/components/authenticator/reset-password':
      return <ResetPassword />;
    case '/ui/components/authenticator/withAuthenticator':
      return <WithAuthenticator />;
    case 'ui/components/in-app-messaging/demo':
      return <InAppMessaging />;
    default:
      logger.warn(
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
