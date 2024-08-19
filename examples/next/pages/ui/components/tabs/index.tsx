import * as React from 'react';
import { Button, Tabs, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function TabsPage() {
  const [tab, setTab] = React.useState('signIn');
  return (
    <>
      <Tabs
        items={[
          {
            label: 'Tab1',
            value: 'Tab1',
            content: (
              <>
                <TextField label="testing" />
              </>
            ),
          },
          {
            label: 'Tab2',
            value: 'Tab2',
            content: (
              <>
                <TextField label="testing" />
              </>
            ),
          },
        ]}
      />
      <Tabs.Container defaultValue="signUp">
        <Tabs.List>
          <Tabs.Item isDisabled value="signIn">
            Sign In
          </Tabs.Item>
          <Tabs.Item value="signUp">Sign up</Tabs.Item>
          <Tabs.Item value="foo">Foo</Tabs.Item>
          <Tabs.Item value="test">Test</Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="signIn">
          <p>Sign in panel</p>
        </Tabs.Panel>

        <Tabs.Panel value="signUp">
          <p>Sign up panel</p>
          <TextField label="name" />
        </Tabs.Panel>

        <Tabs.Panel value="foo">
          <p>foo panel</p>
        </Tabs.Panel>
      </Tabs.Container>

      <Tabs.Container value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Item value="signIn">Sign In</Tabs.Item>
          <Tabs.Item value="signUp">Sign up</Tabs.Item>
          <Tabs.Item isDisabled value="test">
            Test
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="signIn">
          <p>Sign in panel</p>
          <Button
            onClick={() => {
              setTab('signUp');
            }}
          >
            Go to sign up
          </Button>
        </Tabs.Panel>

        <Tabs.Panel value="signUp">
          <p>Sign up panel</p>
        </Tabs.Panel>
      </Tabs.Container>
    </>
  );
}
