import {
  Card,
  Flex,
  Grid,
  Heading,
  Icon,
  View,
  Text,
} from '@aws-amplify/ui-react';
import {
  baseComponents,
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
      {components.map(({ href, label, body, icon }) => (
        <Link href={`/${platform}${href}`} key={href} passHref>
          <Card className="docs-component-card">
            <Flex alignItems="flex-start">
              {icon ? (
                <View
                  as="span"
                  padding="1rem"
                  backgroundColor="brand.secondary.10"
                  borderRadius="small"
                >
                  <Icon
                    ariaLabel=""
                    as={icon}
                    fontSize="xl"
                    color="brand.secondary.60"
                  />
                </View>
              ) : null}
              <View>
                <Text fontWeight="bold">{label}</Text>
                <Text className="docs-component-card-contents">{body}</Text>
              </View>
            </Flex>
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
