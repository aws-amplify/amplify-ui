import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
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
  framework?: Framework;
  component?: string;
}

export const InstallScripts = ({
  framework,
  component,
}: InstallScriptsProps) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  // infer framework from router if framework isn't specified
  if (!framework) {
    framework = platform as Framework;
  }

  return (
    <Tabs>
      <TabItem title="npm">
        <TerminalCommand
          framework={framework}
          component={component}
          packageManager="npm"
        />
      </TabItem>
      <TabItem title="yarn">
        <TerminalCommand
          framework={framework}
          component={component}
          packageManager="yarn"
        />
      </TabItem>
    </Tabs>
  );
};
