import Link from 'next/link';
import { Card, Grid, Heading, Alert, Badge, Flex } from '@aws-amplify/ui-react';
import {
  baseComponents,
  connectedComponents,
  dataDisplayComponents,
  feedbackComponents,
  inputComponents,
  layoutComponents,
  navigationComponents,
  utilityComponents,
} from '@/data/links';

const ComponentGrid = ({ components }) => {
  return (
    <Grid templateColumns="1fr 1fr" gap="var(--amplify-space-large)">
      {components.map(({ href, label, body }) => (
        <Link href={href} key={href}>
          <Card className="docs-component-card">
            <Heading level={4}>{label}</Heading>
            <div className="docs-component-card-contents">{body}</div>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export const ComponentsGrid = () => {
  return (
    <Flex direction="column" gap="var(--amplify-space-large)">
      <Heading level={3}>Connected components</Heading>
      <ComponentGrid components={connectedComponents} />
      <Heading level={3}>Base components</Heading>
      <ComponentGrid components={baseComponents} />
      <Heading level={3}>Feedback components</Heading>
      <ComponentGrid components={feedbackComponents} />
      <Heading level={3}>Navigation components</Heading>
      <ComponentGrid components={navigationComponents} />

      <Heading level={6}>Input components</Heading>
      <ComponentGrid components={inputComponents} />

      <Heading level={6}>Layout components</Heading>
      <ComponentGrid components={layoutComponents} />

      <Heading level={6}>Data display components</Heading>
      <ComponentGrid components={dataDisplayComponents} />

      <Heading level={6}>Utility components</Heading>
      <ComponentGrid components={utilityComponents} />
    </Flex>
  );
};
