import * as React from 'react';
import { I18n } from 'aws-amplify';
import { useActor } from '@xstate/react';

import { useTheme } from '../../../hooks';
import { DescriptionBullet } from '../shared/DescriptionBullet';
import { useLivenessFlow } from '../providers';
import { CancelButton } from '../shared/CancelButton';
import { Flex, Heading, Button, Collection, Divider } from '../../..';

const INSTRUCTIONS = [
  {
    title: I18n.get('Provide camera permissions'),
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quaerat nisi voluptatem mollitia. Rerum incidunt impedit',
  },
  {
    title: I18n.get('Liveness check'),
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quaerat nisi voluptatem mollitia. Rerum incidunt impedit',
  },
  {
    title: I18n.get('Legal desclaimer'),
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quaerat nisi voluptatem mollitia. Rerum incidunt impedit',
  },
];

export const StartLiveness = () => {
  const { tokens } = useTheme();

  const { service } = useLivenessFlow();
  const [_, send] = useActor(service);

  return (
    <Flex
      direction="column"
      padding={`${tokens.space.medium} ${tokens.space.large}`}
    >
      <Heading level={3}>{I18n.get('How it works')}</Heading>
      <Collection
        type="list"
        items={INSTRUCTIONS}
        gap={`${tokens.space.large}`}
      >
        {(item, index) => (
          <DescriptionBullet
            key={item.title}
            index={index + 1}
            title={item.title}
            desc={item.desc}
          />
        )}
      </Collection>
      <Divider />
      <Flex
        direction={{ base: 'column-reverse', medium: 'row' }}
        justifyContent="flex-end"
      >
        <CancelButton />

        <Button
          variation="primary"
          type="button"
          onClick={() => send({ type: 'BEGIN' })}
        >
          {I18n.get('Begin liveness check')}
        </Button>
      </Flex>
    </Flex>
  );
};
