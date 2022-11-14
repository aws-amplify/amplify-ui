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
}

const frameworkInstallScript = (
  framework: Framework,
  packageManager: PackageManager
) => {
  const isReactNative = framework === 'react-native';

  const packageManagerPrefix = `${
    packageManager === 'npm' ? 'npm i' : 'yarn add'
  }`;

  const extraDependencies = `${
    isReactNative ? ` ${REACT_NATIVE_DEPENDENCIES}` : ''
  }`;

  return `${packageManagerPrefix} @aws-amplify/ui-${framework} aws-amplify${extraDependencies}`;
};

export const TerminalCommand = ({
  framework,
  packageManager,
  command,
  variant = 'default',
}: TerminalCommandProps) => {
  const terminalCommand = command
    ? command
    : frameworkInstallScript(framework, packageManager);

  return (
    <code className={`install-code__container ${variant}`}>
      <p className="install-code__content">{terminalCommand}</p>
      <CopyButton
        className="install-code__button"
        copyText={terminalCommand}
        variation="link"
      />
    </code>
  );
};

interface InstallScriptsProps {
  framework?: Framework;
}

export const InstallScripts = ({ framework }: InstallScriptsProps) => {
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
        <TerminalCommand framework={framework} packageManager="npm" />
      </TabItem>
      <TabItem title="yarn">
        <TerminalCommand framework={framework} packageManager="yarn" />
      </TabItem>
    </Tabs>
  );
};
