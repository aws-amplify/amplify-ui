import { Alert, Link, Tabs, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  Framework,
  FRAMEWORK_DISPLAY_NAMES,
  MAJOR_VERSIONS,
} from '../data/frameworks';

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

export const MigrationGuideCallout = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }
  return (
    <Alert role="none" variation="info">
      Working with version {MAJOR_VERSIONS[framework][1]} or earlier?{' '}
      <Link href="../../getting-started/migration">
        See our migration guide.
      </Link>
    </Alert>
  );
};

export const MajorVersionsList = ({ framework, component }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const latest = (
    <li key={0}>
      <code>
        @aws-amplify/ui-{framework}@{MAJOR_VERSIONS[framework][0]}.x (latest)
      </code>
    </li>
  );

  const otherVersions = MAJOR_VERSIONS[framework]
    .slice(1)
    .map((version, index) => (
      <li key={index + 1}>
        <code>
          @aws-amplify/ui-{framework}@{version}.x
        </code>
      </li>
    ));
  const listItems = [latest, ...otherVersions];
  return (
    <div>
      The <code>{component}</code> component for{' '}
      {FRAMEWORK_DISPLAY_NAMES[framework]} currently offers the following major
      versions:
      <ul>{listItems}</ul>
      <MigrationGuideCallout framework={framework} />
    </div>
  );
};

export const AngularSlotsRename = () => {
  return (
    <Alert
      role="none"
      variation="info"
      heading={`Angular ${MAJOR_VERSIONS['angular'][1]}`}
    >
      <Text>
        <code>forgot-password-header</code> and{' '}
        <code>forgot-password-footer</code> were renamed in version{' '}
        {MAJOR_VERSIONS['angular'][0]}. In versions{' '}
        {MAJOR_VERSIONS['angular'][1]} and earlier, use
        <code>reset-password-header</code> and{' '}
        <code>reset-password-footer</code> in their place.
      </Text>
    </Alert>
  );
};

export const TabsComponent = ({ children }) => {
  return (
    <Tabs.Container defaultValue={`${MAJOR_VERSIONS['angular'][0]}`}>
      <Tabs.List>
        <Tabs.Item value={`${MAJOR_VERSIONS['angular'][0]}`}>
          Version {MAJOR_VERSIONS['angular'][0]}
        </Tabs.Item>
        <Tabs.Item value={`${MAJOR_VERSIONS['angular'][0]}`}>
          Version {MAJOR_VERSIONS['angular'][1]}
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value={`${MAJOR_VERSIONS['angular'][0]}`}>
        {children}
      </Tabs.Panel>
      .
    </Tabs.Container>
  );
};
