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
import { Card, Flex, Grid, Heading } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ComponentGrid = ({ components }) => {
  const { query } = useRouter();
  return (
    <Grid templateColumns="1fr 1fr" gap="var(--amplify-space-large)">
      {components.map(({ href, label, body }) => (
        <Link href={{ pathname: href, query }} key={href}>
          <Card className="docs-component-card" variation="elevated">
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

      <Heading level={3}>Input components</Heading>
      <ComponentGrid components={inputComponents} />

      <Heading level={3}>Layout components</Heading>
      <ComponentGrid components={layoutComponents} />

      <Heading level={3}>Data display components</Heading>
      <ComponentGrid components={dataDisplayComponents} />

      <Heading level={3}>Utility components</Heading>
      <ComponentGrid components={utilityComponents} />
    </Flex>
  );
};
