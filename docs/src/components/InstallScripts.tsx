import { CopyButton } from '@/components/CopyButton';
import { Tabs } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { Framework, REACT_NATIVE_DEPENDENCIES } from '../data/frameworks';

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
      <CopyButton
        className="install-code__button"
        copyText={terminalCommand}
        size="small"
        variation="link"
      />
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
