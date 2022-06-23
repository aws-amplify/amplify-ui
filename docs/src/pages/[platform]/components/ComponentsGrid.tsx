import { Card, Flex, Grid, Heading } from '@aws-amplify/ui-react';
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

import Link from 'next/link';
import { useCustomRouter } from '@/components/useCustomRouter';

const ComponentGrid = ({ components }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <Grid
      templateColumns={{ base: '1fr', large: '1fr 1fr' }}
      gap="var(--amplify-space-large)"
    >
      {components.map(({ href, label, body }) => (
        <Link href={`/${platform}${href}`} key={href} passHref>
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
  const { query } = useCustomRouter();
  const { platform = 'react' } = query;

  const platformComponents = components.filter((component) => {
    if (component.platforms) {
      return component.platforms.includes(platform) && !component.tertiary;
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
