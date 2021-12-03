import * as React from 'react';
import { translate } from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import { CancelButton, DescriptionBullet } from '../shared';
import { useLivenessActor } from '../hooks';
import {
  Flex,
  Heading,
  Button,
  Collection,
  Divider,
  Text,
  View,
} from '../../..';

const INSTRUCTIONS = [
  {
    title: translate('Provide camera permissions'),
    desc: translate(
      "Liveness needs permission to use your device's camera to verify your presence and identity."
    ),
  },
  {
    title: translate('Liveness check'),
    desc: translate(
      'Follow instructions on the screen to record a short video of yourself and verify your identity and presence.'
    ),
  },
];

export const StartLiveness = () => {
  const { tokens } = useTheme();
  const [_, send] = useLivenessActor();

  return (
    <Flex direction="column">
      <Heading level={3}>{translate('How it works')}</Heading>
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
          {translate('Begin check')}
        </Button>
      </Flex>

      <Flex
        justifyContent="flex-end"
        style={{ marginTop: `calc(-1 * ${tokens.space.small})` }}
      >
        <View>
          <Text
            as="span"
            fontSize={`${tokens.fontSizes.xs}`}
            fontWeight={`${tokens.fontWeights.bold}`}
            color={`${tokens.colors.font.tertiary}`}
          >
            {translate<string>('Legal desclaimer: ')}
          </Text>
          <Text
            as="span"
            fontSize={`${tokens.fontSizes.xs}`}
            color={`${tokens.colors.font.tertiary}`}
          >
            {translate<string>(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quaerat nisi voluptatem mollitia. Rerum incidunt impedit'
            )}
          </Text>
        </View>
      </Flex>
    </Flex>
  );
};
