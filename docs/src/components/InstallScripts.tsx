import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';

type WebFramework = 'react' | 'vue' | 'angular';

interface TerminalCommandProps {
  framework?: WebFramework;
  packageManager?: 'npm' | 'yarn';
  terminalCommand?: string;
}

const frameworkInstallScript = (framework, packageManager) =>
  `${
    packageManager === 'npm' ? 'npm i' : 'yarn add'
  } @aws-amplify/ui-${framework} aws-amplify`;

export const TerminalCommand = ({
  framework,
  packageManager,
  terminalCommand,
}: TerminalCommandProps) => {
  const command = terminalCommand
    ? terminalCommand
    : frameworkInstallScript(framework, packageManager);

  return (
    <code className="install-code__container">
      <p className="install-code__content">{command}</p>
      <CopyButton
        className="install-code__button"
        copyText={command}
        variation="link"
      />
    </code>
  );
};

export const InstallScripts = (framework: WebFramework) => {
  return (
    <Tabs maxWidth="42rem">
      <TabItem title="npm">
        <TerminalCommand framework={framework} packageManager="npm" />
      </TabItem>
      <TabItem title="yarn">
        <TerminalCommand framework={framework} packageManager="yarn" />
      </TabItem>
    </Tabs>
  );
};
