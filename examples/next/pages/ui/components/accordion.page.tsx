import * as React from 'react';
import {
  Button,
  Accordion,
  Flex,
  Heading,
  Divider,
  Text,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { TextField } from '@aws-amplify/ui-react';

export default function ExpanderPage() {
  const [controlled, setControlled] = React.useState<string[]>(['2']);

  return (
    <Flex direction="column" gap="xl">
      <Heading level={4}>Default accordion, no props</Heading>
      <Accordion indicatorPosition="start" variation="outlined">
        <Accordion.Item value="1" title="Hello">
          <Text>my friend</Text>
        </Accordion.Item>
        <Accordion.Item value="2" title="Hello">
          <Text>my enemy</Text>
          <TextField label="name" />
        </Accordion.Item>
      </Accordion>

      <Divider />
      <Heading level={4}>Single item, no accordion</Heading>
      <Accordion.Item title="Single accordion item" variation="outlined">
        <Text>hello</Text>
      </Accordion.Item>

      <Divider />
      <Heading level={4}>Controlled</Heading>
      <Accordion value={controlled} onChange={setControlled}>
        <Accordion.Item value="1" title="First">
          <Text>Test</Text>
          <Button
            onClick={() => {
              setControlled(['2']);
            }}
          >
            Next
          </Button>
        </Accordion.Item>
        <Accordion.Item value="2" title="Second">
          <Text>Test</Text>
        </Accordion.Item>
      </Accordion>
      <Button
        onClick={() => {
          setControlled(['1', '2']);
        }}
      >
        Open 1 and 2
      </Button>

      <Divider />
      <Heading level={4}>allowMultiple</Heading>
      <Accordion allowMultiple variation="outlined">
        <Accordion.Item value="1" title="One" variation="elevated">
          <Text>One</Text>
        </Accordion.Item>
        <Accordion.Item value="2" title="Two">
          <Text>Two</Text>
        </Accordion.Item>
        <Accordion.Item value="3" title="Three">
          <Text>Three</Text>
        </Accordion.Item>
      </Accordion>

      <Divider />
      <Heading level={4}>allowMultiple & allowToggle</Heading>
      <Accordion allowMultiple allowToggle>
        <Accordion.Item value="1" title="One">
          <Text>One</Text>
        </Accordion.Item>
        <Accordion.Item value="2" title="Two">
          <Text>Two</Text>
        </Accordion.Item>
      </Accordion>

      <Divider />
      <Heading level={4}>Uncontrolled, defaultValue, allowMultiple</Heading>
      <Accordion allowMultiple defaultValue={['2']}>
        <Accordion.Item value="1" title="One">
          <Text>One</Text>
        </Accordion.Item>
        <Accordion.Item value="2" title="Two">
          <Text>Two</Text>
        </Accordion.Item>
      </Accordion>
    </Flex>
  );
}
