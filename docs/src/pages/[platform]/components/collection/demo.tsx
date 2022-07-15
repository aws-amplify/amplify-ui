import * as React from 'react';
import {
  Card,
  View,
  Image,
  Badge,
  Button,
  Flex,
  Divider,
  Heading,
  Collection,
  FlexContainerStyleProps,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';
import { CollectionPropControls } from './CollectionPropControls';
import { useCollectionProps } from './useCollectionProps';
import {
  filterDemoProps,
  getDemoProps,
  objectEntriesToPropString,
} from '../utils/demoProps';

const propsToCode = (props) => {
  const filteredProps = filterDemoProps(props);
  return `
const items = [
  {
    title: 'Milford - Room #1',
    badges: ['Waterfront', 'Verified'],
  },
  {
    title: 'Milford - Room #2',
    badges: ['Mountain', 'Verified'],
  },
];

<Collection
  items={items}
  type="list"
${objectEntriesToPropString(Object.entries(filteredProps))}
>
  {(item, index) => (
    <Card
      key={index}
      borderRadius="medium"
      maxWidth="20rem"
      variation="outlined"
    >
      <Image
        src="/road-to-milford-new-zealand-800w.jpg"
        alt="Glittering stream with old log, snowy mountain peaks tower over a green field."
      />
      <View padding="xs">
        <Flex>
          {item.badges.map((badge) => (
            <Badge
              key={badge}
              backgroundColor={
                badge === 'Waterfront' ? 'blue.40' 
                : badge === 'Mountain' ? 'green.40' : 'yellow.40'}
            >
              {badge}
            </Badge>
          ))}
        </Flex>
        <Divider padding="xs" />
        <Heading padding="medium">{item.title}</Heading>
        <Button variation="primary" isFullWidth>
          Book it
        </Button>
      </View>
    </Card>
  )}
</Collection>`;
};

const defaultValues = {
  direction: 'row',
  gap: '20px',
  wrap: 'nowrap',
};

export const CollectionDemo = () => {
  const collectionProps = useCollectionProps(
    demoState.get(Collection.displayName) || defaultValues
  );
  const demoProps = ['alignContent', 'alignItems', 'direction', 'gap', 'wrap'];
  const collectionDemoProps = getDemoProps(collectionProps, demoProps);

  const items = [
    {
      title: 'Milford - Room #1',
      badges: ['Waterfront', 'Verified'],
    },
    {
      title: 'Milford - Room #2',
      badges: ['Mountain', 'Verified'],
    },
  ];

  return (
    <Demo
      code={propsToCode(collectionDemoProps)}
      propControls={<CollectionPropControls {...collectionProps} />}
    >
      <View backgroundColor="neutral.20" padding="1rem">
        <Collection
          items={items}
          type="list"
          direction={
            collectionProps.direction as FlexContainerStyleProps['direction']
          }
          gap={collectionProps.gap as FlexContainerStyleProps['gap']}
          wrap={collectionProps.wrap as FlexContainerStyleProps['wrap']}
        >
          {(item, index) => (
            <Card
              key={index}
              borderRadius="medium"
              maxWidth="20rem"
              variation="outlined"
            >
              <Image
                src="/road-to-milford-new-zealand-800w.jpg"
                alt="Glittering stream with old log, snowy mountain peaks tower over a green field."
              />
              <View padding="xs">
                <Flex>
                  {item.badges.map((badge) => (
                    <Badge
                      key={badge}
                      backgroundColor={
                        badge === 'Waterfront'
                          ? 'blue.40'
                          : badge === 'Mountain'
                          ? 'green.40'
                          : 'yellow.40'
                      }
                    >
                      {badge}
                    </Badge>
                  ))}
                </Flex>
                <Divider padding="xs" />
                <Heading padding="medium">{item.title}</Heading>
                <Button variation="primary" isFullWidth>
                  Book it
                </Button>
              </View>
            </Card>
          )}
        </Collection>
      </View>
    </Demo>
  );
};
