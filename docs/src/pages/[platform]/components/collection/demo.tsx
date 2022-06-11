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
  useTheme,
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
<Collection
  type='list'
${objectEntriesToPropString(Object.entries(filteredProps))}
>
  {collectionItems}
</Collection>`;
};

export const CollectionDemo = () => {
  const defaultValues = {
    direction: 'row',
    gap: '20px',
    wrap: 'nowrap',
  };

  const { tokens } = useTheme();

  const collectionProps = useCollectionProps(
    demoState.get(Collection.displayName) || defaultValues
  );
  const demoProps = ['alignContent', 'alignItems', 'direction', 'gap', 'wrap'];
  const collectionDemoProps = getDemoProps(collectionProps, demoProps);

  const list = [
    {
      title: 'Milford - Room #1',
      imageSrc: '/road-to-milford-new-zealand-800w.jpg',
      imageAlt:
        'Glittering stream with old log, snowy mountain peaks tower over a green field.',
      badges: [
        {
          color: 'lightblue',
          text: 'Waterfront',
        },
        {
          color: 'lightgreen',
          text: 'Verified',
        },
      ],
    },
    {
      title: 'Milford - Room #2',
      imageSrc: '/road-to-milford-new-zealand-800w.jpg',
      imageAlt:
        'Glittering stream with old log, snowy mountain peaks tower over a green field.',
      badges: [
        {
          color: tokens.colors.yellow[60].value,
          text: 'Mountain',
        },
        {
          color: 'lightgreen',
          text: 'Verified',
        },
      ],
    },
  ];

  return (
    <Demo
      code={propsToCode(collectionDemoProps)}
      propControls={<CollectionPropControls {...collectionProps} />}
    >
      <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.medium}
      >
        <Collection
          items={list}
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
              maxWidth="20rem"
              variation="outlined"
              borderRadius="5px"
            >
              <Image src={item.imageSrc} alt={item.imageAlt} />
              <View padding={tokens.space.xs}>
                <Flex>
                  {item.badges.map((badge) => (
                    <Badge key={badge.text} backgroundColor={badge.color}>
                      {badge.text}
                    </Badge>
                  ))}
                </Flex>
                <Divider padding={`${tokens.space.xxxs} 0`} />
                <Heading level={6} padding={tokens.space.xxxs}>
                  {item.title}
                </Heading>
                <Button isFullWidth={true} variation="primary">
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
