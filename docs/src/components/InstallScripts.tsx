import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';

type WebFramework = 'react' | 'vue' | 'angular';

interface TerminalCommandProps {
  framework: WebFramework;
  packageManager: 'npm' | 'yarn';
}

const TerminalCommand = ({
  framework,
  packageManager,
}: TerminalCommandProps) => {
  const frameworkInstallScript = `${
    packageManager === 'npm' ? 'npm i' : 'yarn add'
  } @aws-amplify/ui-${framework} aws-amplify`;

  return (
    <code className="install-code__container">
      <p className="install-code__content">{frameworkInstallScript}</p>
      <CopyButton
        className="install-code__button"
        copyText={frameworkInstallScript}
        variation="link"
      />
    </code>
  );
};

interface InstallScriptsProps {
  framework: WebFramework;
}

export const InstallScripts = ({ framework }: InstallScriptsProps) => {
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
