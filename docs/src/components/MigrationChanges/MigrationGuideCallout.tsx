import { Alert, Link } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  CURRENT_MAJOR_VERSIONS,
  PREV_MAJOR_VERSIONS,
  Framework,
} from '../../data/frameworks';

export const MigrationGuideCallout = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  return (
    <Alert
      role="none"
      variation="info"
      heading={`@aws-amplify/ui-${framework} version ${PREV_MAJOR_VERSIONS[framework]}`}
    >
      The <code>@aws-amplify/ui-{framework}</code> package is currently on
      version {CURRENT_MAJOR_VERSIONS[framework]}. Working with
      <code>@aws-amplify/ui-{framework}</code> version{' '}
      {PREV_MAJOR_VERSIONS[framework]} or earlier?{' '}
      <Link href={`../../${framework}/getting-started/migration`}>
        See our migration guide.
      </Link>
    </Alert>
  );
};
