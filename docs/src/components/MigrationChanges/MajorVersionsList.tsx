import { Alert, Link, Tabs, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  Framework,
  FRAMEWORK_DISPLAY_NAMES,
  MAJOR_VERSIONS,
} from '../../data/frameworks';

const MigrationGuideCallout = ({ framework }) => {
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
