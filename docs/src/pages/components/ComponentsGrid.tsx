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
  const { platform = 'react' } = query;
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

const ComponentGridSection = ({ heading, components }) => {
  const { query } = useRouter();
  const { platform = 'react' } = query;

  const platformComponents = components.filter((component) => {
    if (component.platforms) {
      return component.platforms.includes(platform);
    }
    return true;
  });

  if (!platformComponents.length) {
    return null;
  }
  return (
    <>
      <Heading level={3}>{heading}</Heading>
      <ComponentGrid components={platformComponents} />
    </>
  );
};

export const ComponentsGrid = () => {
  return (
    <Flex direction="column" gap="var(--amplify-space-large)">
      <ComponentGridSection
        heading={'Connected components'}
        components={connectedComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Base components'}
        components={baseComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Feedback components'}
        components={feedbackComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Navigation components'}
        components={navigationComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Input components'}
        components={inputComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Layout components'}
        components={layoutComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Data display components'}
        components={dataDisplayComponents}
      ></ComponentGridSection>

      <ComponentGridSection
        heading={'Utility components'}
        components={utilityComponents}
      ></ComponentGridSection>
    </Flex>
  );
};
