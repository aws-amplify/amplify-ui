import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';

type Framework = 'react' | 'vue' | 'angular' | 'flutter';
type PackageManager = 'npm' | 'yarn';

interface TerminalCommandProps {
  framework: Framework;
  packageManager: PackageManager;
}

interface InstallScriptsProps {
  framework: Framework;
}

const flutterInstallScript = 'flutter pub add amplify_authenticator';

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

export const InstallScripts = ({ framework }: InstallScriptsProps) => {
  return framework !== 'flutter' ? (
    <Tabs maxWidth="42rem">
      <TabItem title="npm">
        <TerminalCommand framework={framework} packageManager="npm" />
      </TabItem>
      <TabItem title="yarn">
        <TerminalCommand framework={framework} packageManager="yarn" />
      </TabItem>
    </Tabs>
  ) : (
    <code className="install-code__container">
      <p className="install-code__content install-code__script">
        {flutterInstallScript}
      </p>
      <CopyButton
        className="install-code__button"
        copyText={flutterInstallScript}
        variation="link"
      />
    </code>
  );
};
