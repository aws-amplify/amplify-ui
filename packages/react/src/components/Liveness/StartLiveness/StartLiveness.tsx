import * as React from 'react';
import {
  translate,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_GET_READY_SCREEN,
} from '@aws-amplify/ui';

import { DescriptionBullet } from '../shared';
import { useFaceLivenessDetector } from '../providers';
import {
  Flex,
  Button,
  Collection,
  Text,
  View,
  Card,
} from '../../../primitives';

export const INSTRUCTIONS = [
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

const START_CLASS_NAME = 'liveness-detector-start';

export interface StartLivenessProps {
  beginLivenessCheck: () => void;
}

export function StartLiveness(props: StartLivenessProps): JSX.Element {
  const { beginLivenessCheck } = props;
  const { flowProps } = useFaceLivenessDetector();

  React.useEffect(() => {
    recordLivenessAnalyticsEvent(flowProps, {
      event: LIVENESS_EVENT_GET_READY_SCREEN,
      attributes: { action: 'AttemptLiveness' },
      metrics: { count: 1 },
    });
    const pageLoadTime = Date.now();

    return () => {
      recordLivenessAnalyticsEvent(flowProps, {
        event: LIVENESS_EVENT_GET_READY_SCREEN,
        attributes: { action: 'TimeSpent' },
        metrics: {
          duration: Date.now() - pageLoadTime,
        },
      });
    };
  }, [flowProps]);

  return (
    <Card
      data-amplify-liveness-detector-start=""
      className={START_CLASS_NAME}
      data-testid={START_CLASS_NAME}
    >
      <Flex direction="column">
        <Collection type="list" items={INSTRUCTIONS}>
          {(item, index) => (
            <DescriptionBullet
              key={item.title}
              index={index + 1}
              title={item.title}
              desc={item.desc}
            />
          )}
        </Collection>
        <Flex justifyContent="center">
          <Button
            variation="primary"
            type="button"
            onClick={beginLivenessCheck}
          >
            {translate('Begin check')}
          </Button>
        </Flex>

        <View fontSize="xs">
          <Text as="span" color="font.tertiary" fontWeight="bold">
            {translate<string>('Legal desclaimer: ')}
          </Text>
          <Text as="span" color="font.tertiary">
            {translate<string>(
              'By using this service, you provide your express, informed, written release and consent for this app and Amazon Web Services to collect, use and store your biometric data.'
            )}
          </Text>
        </View>
      </Flex>
    </Card>
  );
}
