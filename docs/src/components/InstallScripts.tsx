import { CopyButton } from '@/components/CopyButton';
import { Alert, Tabs, Text } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import {
  Framework,
  FRAMEWORK_DISPLAY_NAMES,
  REACT_NATIVE_DEPENDENCIES,
  MAJOR_VERSIONS,
} from '../data/frameworks';

type PackageManager = 'npm' | 'yarn';

interface TerminalCommandProps {
  framework?: Framework;
  packageManager?: PackageManager;
  command?: string;
  variant?: 'default' | 'hero';
  component?: string;
}

const frameworkInstallScript = (
  framework: Framework,
  packageManager: PackageManager,
  component?: string
) => {
  const isReactNative = framework === 'react-native';

  const packageManagerPrefix = `${
    packageManager === 'npm' ? 'npm install' : 'yarn add'
  }`;

  const extraDependencies = `${
    isReactNative ? ` ${REACT_NATIVE_DEPENDENCIES}` : ''
  }`;

  const componentSubpackage = component ? `-${component}` : '';

  return `${packageManagerPrefix} @aws-amplify/ui-${framework}${componentSubpackage} aws-amplify${extraDependencies}`;
};

export const PrevVersionInstallAlert = ({ framework }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }

  const prevFrameworkVersion = MAJOR_VERSIONS[framework][1];
  const heading = `${FRAMEWORK_DISPLAY_NAMES[framework]} ${prevFrameworkVersion}`;

  const isReactNative = framework === 'react-native';
  if (isReactNative) {
    return (
      <Alert role="none" variation="info" heading={heading}>
        <Text>
          Using version {prevFrameworkVersion} of{' '}
          <code>@aws-amplify/ui-{framework}</code>? *Omit* `@aws-amplify/
          {framework} and *specify* versions{' '}
          <code>
            @aws-amplify/ui-{framework}@{prevFrameworkVersion}.x
          </code>{' '}
          and <code>aws-amplify@{MAJOR_VERSIONS['aws-amplify'][1]}.x</code>.
        </Text>
      </Alert>
    );
  }
  return (
    <Alert role="none" variation="info" heading={heading}>
      <Text>
        Using version {prevFrameworkVersion} of{' '}
        <code>@aws-amplify/ui-{framework}</code>? Specify versions{' '}
        <code>
          @aws-amplify/ui-{framework}@{prevFrameworkVersion}.x
        </code>{' '}
        and <code>aws-amplify@{MAJOR_VERSIONS['aws-amplify'][1]}.x</code>.
      </Text>
    </Alert>
  );
};

export const TerminalCommand = ({
  framework,
  component,
  packageManager,
  command,
  variant = 'default',
}: TerminalCommandProps) => {
  const terminalCommand = command
    ? command
    : frameworkInstallScript(framework, packageManager, component);

  return (
    <div className={`install-code__container ${variant}`}>
      <code className="install-code__content">{terminalCommand}</code>
      <CopyButton className="install-code__button" target={terminalCommand} />
    </div>
  );
};

interface InstallScriptsProps {
  command?: string;
  framework?: Framework;
  component?: string;
}

export const InstallScripts = ({
  // override framework default platform install command
  command,
  component,
  framework,
}: InstallScriptsProps) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  // infer framework from router if framework isn't specified
  if (!framework) {
    framework = platform as Framework;
  }

  return (
    <Tabs.Container defaultValue="npm">
      <Tabs.List>
        <Tabs.Item value="npm">npm</Tabs.Item>
        <Tabs.Item value="yarn">yarn</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel value="npm">
        <TerminalCommand
          framework={framework}
          command={command}
          component={component}
          packageManager="npm"
        />
      </Tabs.Panel>
      <Tabs.Panel value="yarn">
        <TerminalCommand
          framework={framework}
          command={command}
          component={component}
          packageManager="yarn"
        />
      </Tabs.Panel>
    </Tabs.Container>
  );
};
