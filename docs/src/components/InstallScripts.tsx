import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

type WebFramework = 'react' | 'vue' | 'angular';
type PackageManager = 'npm' | 'yarn';

interface TerminalCommandProps {
  framework?: WebFramework;
  packageManager?: PackageManager;
  command?: string;
}

const frameworkInstallScript = (
  framework: WebFramework,
  packageManager: PackageManager
) =>
  `${
    packageManager === 'npm' ? 'npm i' : 'yarn add'
  } @aws-amplify/ui-${framework} aws-amplify`;

export const TerminalCommand = ({
  framework,
  packageManager,
  command,
}: TerminalCommandProps) => {
  const terminalCommand = command
    ? command
    : frameworkInstallScript(framework, packageManager);

  return (
    <code className="install-code__container">
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
  framework?: WebFramework;
}

export const InstallScripts = ({ framework }: InstallScriptsProps) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  // infer framework from router if framework isn't specified
  if (!framework) {
    framework = platform as WebFramework;
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
