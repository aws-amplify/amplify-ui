import * as React from 'react';
import {
  Accordion,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  TextField,
} from '@aws-amplify/ui-react';

const accordions = [
  {
    value: '1',
    header: 'Hello',
    body: 'My old friend',
  },
  {
    value: '2',
    header: 'Goodbye',
    body: 'My new friend',
  },
  {
    value: '3',
    header: 'Hello again',
    body: 'My old friend',
  },
];

export default function ExpanderPage() {
  const [controlled, setControlled] = React.useState<string[]>(['2']);

  return (
    <Flex direction="column" gap="xl">
      <Heading level={4}>Default accordion, no props</Heading>
      <Accordion.Container>
        {accordions.map(({ value, header, body }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Trigger>
              {header}
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>{body}</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Container>

      <Divider />
      <Heading level={4}>Single item, no accordion</Heading>
      <Accordion.Item>
        <Accordion.Trigger>
          Header
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>Body</Text>
        </Accordion.Content>
      </Accordion.Item>

      <Divider />
      <Heading level={4}>Controlled</Heading>
      <Accordion.Container value={controlled} onValueChange={setControlled}>
        <Accordion.Item value="1">
          <Accordion.Trigger>First</Accordion.Trigger>
          <Accordion.Content>
            <Text>Test</Text>
            <Button
              onClick={() => {
                setControlled(['2']);
              }}
            >
              Next
            </Button>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Trigger>Second</Accordion.Trigger>
          <Accordion.Content>
            <Text>Test</Text>
            <TextField label="Test" />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Container>
      <Button
        onClick={() => {
          setControlled(['1', '2']);
        }}
      >
        Open 1 and 2
      </Button>

      <Divider />
      <Heading level={4}>allowMultiple</Heading>
      <Accordion.Container allowMultiple>
        {accordions.map(({ value, header, body }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Trigger>
              {header}
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>{body}</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Container>

      <Divider />
      <Heading level={4}>preventCollapse</Heading>
      <Accordion.Container preventCollapse>
        {accordions.map(({ value, header, body }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Trigger>
              {header}
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>{body}</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Container>

      <Divider />
      <Heading level={4}>Uncontrolled, defaultValue, allowMultiple</Heading>
      <Accordion.Container allowMultiple defaultValue={['2']}>
        {accordions.map(({ value, header, body }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Trigger>
              {header}
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text>{body}</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Container>
    </Flex>
  );
}
