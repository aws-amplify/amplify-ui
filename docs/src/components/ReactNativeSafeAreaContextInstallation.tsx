import { Accordion } from '@aws-amplify/ui-react';
import { TerminalCommand } from './InstallScripts';

export function ReactNativeSafeAreaContextInstallation() {
  return (
    <Accordion.Container>
      <Accordion.Item value="Accordion-item">
        <Accordion.Trigger>
          <span>
            Important note for integration with React Native projects using
            version <code>0.74</code> or below
          </span>
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          <div>
            Different major versions of peer dependency
            <code>react-native-safe-area-context</code> are designed to be
            compatible with specific React Native versions.
          </div>
          <br />
          <div>
            For React Native version <code>0.74</code> or below, you must
            install version
            <code>4.x</code> of <code>react-native-safe-area-context</code>.
          </div>
          <br />
          <TerminalCommand command="npm install react-native-safe-area-context@^4.2.5" />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
}
