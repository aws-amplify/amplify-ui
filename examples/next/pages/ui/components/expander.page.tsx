import * as React from 'react';
import { Button, Expander, ExpanderGroup } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function ExpanderPage() {
  const [controlled, setControlled] = React.useState<string[]>(['2']);

  return (
    <>
      <Button
        onClick={() => {
          setControlled(['1', '2']);
        }}
      >
        Next
      </Button>
      <ExpanderGroup>
        <Expander value="1" title="Hello">
          <p>my friend</p>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>

      <Expander>
        <p>hello</p>
      </Expander>

      <ExpanderGroup value={controlled} onValueChange={setControlled}>
        <Expander value="1" title="Hello">
          <p>my friend</p>
          <Button
            onClick={() => {
              setControlled(['2']);
            }}
          >
            Next
          </Button>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>

      <h2>isMultiple</h2>
      <ExpanderGroup multiple>
        <Expander value="1" title="Hello">
          <p>my friend</p>
          <Button>Next</Button>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>
      <h2>isMultiple = false</h2>
      <ExpanderGroup>
        <Expander value="1" title="Hello">
          <p>my friend</p>
          <Button>Next</Button>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>

      <h2>isCollapsible</h2>
      <ExpanderGroup multiple isCollapsible>
        <Expander value="1" title="Hello">
          <p>my friend</p>
          <Button>Next</Button>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>

      <h2>isCollapsible = false</h2>
      <ExpanderGroup multiple defaultValue={['2']}>
        <Expander value="1" title="Hello">
          <p>my friend</p>
          <Button>Next</Button>
        </Expander>
        <Expander value="2" title="Hello">
          <p>my enemy</p>
        </Expander>
      </ExpanderGroup>
    </>
  );
}
