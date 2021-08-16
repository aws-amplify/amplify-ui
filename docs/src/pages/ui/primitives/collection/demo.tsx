import * as React from 'react';
import {
  Card,
  Text,
  View,
  Image,
  Badge,
  Button,
  Flex,
  Divider,
  Heading,
  Collection,
  FlexStyleProps,
} from '@aws-amplify/ui-react';

import { useFlexStyleProps } from '../../../../components/useFlexStyleProps';
import { GetFieldControls } from '../../../../components/GetFieldControls';

export const CollectionDemo = () => {
  const flexStyleProps = useFlexStyleProps({
    alignItems: 'normal',
    alignContent: 'start',
    direction: 'row',
    gap: '20px',
    justifyContent: 'space-between',
    wrap: 'nowrap',
  });
  const PropControls = GetFieldControls({
    typeName: 'Collection List (Flex)',
    fields: flexStyleProps,
  });
  const [
    [alignItems],
    [alignContent],
    [direction],
    [gap],
    [justifyContent],
    [wrap],
  ] = flexStyleProps;

  const list = [
    {
      title: 'Milford Sound - Room #1',
      imageSrc: '/road-to-milford-new-zealand-800w.jpg',
      imageAlt:
        'Glittering stream with old log, snowy mountain peaks tower over a green field.',
      description:
        'Join us on this beautiful outdoor adventure through the glittering rivers through the snowy peaks on New Zealand.',
      badges: [
        {
          color: 'lightblue',
          text: 'Waterfront View',
        },
        {
          color: 'lightgreen',
          text: 'Verified',
        },
      ],
    },
    {
      title: 'Milford Sound - Room #2',
      imageSrc: '/road-to-milford-new-zealand-800w.jpg',
      imageAlt:
        'Glittering stream with old log, snowy mountain peaks tower over a green field.',
      description:
        'Join us on this beautiful outdoor adventure through the glittering rivers through the snowy peaks on New Zealand.',
      badges: [
        {
          color: 'lightyellow',
          text: 'Mountain View',
        },
        {
          color: 'lightgreen',
          text: 'Verified',
        },
      ],
    },
  ];

  return (
    <View width="100%">
      {PropControls}
      <Divider margin="0.5rem 0.5rem" />
      <Collection
        items={list}
        type="list"
        alignContent={alignContent as FlexStyleProps['alignContent']}
        alignItems={alignItems as FlexStyleProps['alignItems']}
        direction={direction as FlexStyleProps['direction']}
        gap={gap as FlexStyleProps['gap']}
        justifyContent={justifyContent as FlexStyleProps['justifyContent']}
        wrap={wrap as FlexStyleProps['wrap']}
      >
        {(item, index) => (
          <Card key={index}>
            <Image src={item.imageSrc} alt={item.imageAlt} />
            <View padding="1rem">
              <Flex>
                {item.badges.map((badge) => (
                  <Badge key={badge.text} backgroundColor={badge.color}>
                    {badge.text}
                  </Badge>
                ))}
              </Flex>
              <Divider padding="1rem 0 0 0" />
              <Heading level={3}>{item.title}</Heading>
              <Text padding="0 0 1rem 0">{item.description}</Text>
              <Button isFullWidth={true}>Book it</Button>
            </View>
          </Card>
        )}
      </Collection>
    </View>
  );
};
