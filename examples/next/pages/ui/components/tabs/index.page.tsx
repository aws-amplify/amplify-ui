import * as React from 'react';
import { Button, Tabs, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function TabsPage() {
  const [tab, setTab] = React.useState('signIn');
  return (
    <>
      <Tabs defaultValue="signUp">
        <Tabs.List>
          <Tabs.Tab isDisabled value="signIn">
            Sign In
          </Tabs.Tab>
          <Tabs.Tab value="signUp">Sign up</Tabs.Tab>
          <Tabs.Tab value="foo">Foo</Tabs.Tab>
          <Tabs.Tab value="test">Test</Tabs.Tab>
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
      </Tabs>

      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="signIn">Sign In</Tabs.Tab>
          <Tabs.Tab value="signUp">Sign up</Tabs.Tab>
          <Tabs.Tab isDisabled value="test">
            Test
          </Tabs.Tab>
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
      </Tabs>
    </>
  );
}
