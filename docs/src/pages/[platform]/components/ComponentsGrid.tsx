import { useRouter } from 'next/router';
import { Flex, Heading, Icon } from '@aws-amplify/ui-react';
import {
  baseComponents,
  dataDisplayComponents,
  feedbackComponents,
  inputComponents,
  layoutComponents,
  navigationComponents,
  utilityComponents,
} from '@/data/links';

import { CardLink, CardLinkGroup } from '@/components/CardLink';

const ComponentGrid = ({ components }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  return (
    <CardLinkGroup>
      {components.map(({ href, label, body, icon }) => (
        <CardLink
          variation="branded"
          icon={icon ? <Icon ariaLabel="" as={icon} /> : null}
          href={`/${platform}${href}`}
          key={href}
          title={label}
          desc={body}
        />
      ))}
    </CardLinkGroup>
  );
};

const ComponentGridSection = ({ heading, components }) => {
  const { query } = useRouter();
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
