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
  ComponentClassNames,
} from '../../../primitives';
import { LivenessAlertIcon } from '../shared/LivenessAlertIcon';
import { useTheme } from '../../../hooks/useTheme';

export const INSTRUCTIONS = [
  {
    desc: translate(
      'Make sure your face is not covered with sunglasses or mask.'
    ),
  },
  {
    desc: translate(
      'Move to a well-lit place that is not dark or in direct sunlight.'
    ),
  },
  {
    desc: translate(
      'When check starts, fit face in oval, and hold for colored lights.'
    ),
  },
];

const START_CLASS_NAME = 'liveness-detector-start';

export interface StartLivenessProps {
  beginLivenessCheck: () => void;
}

export function StartLiveness(props: StartLivenessProps): JSX.Element {
  const { tokens } = useTheme();
  const { beginLivenessCheck } = props;
  const { componentProps } = useFaceLivenessDetector();

  React.useEffect(() => {
    recordLivenessAnalyticsEvent(componentProps, {
      event: LIVENESS_EVENT_GET_READY_SCREEN,
      attributes: { action: 'AttemptLiveness' },
      metrics: { count: 1 },
    });
    const pageLoadTime = Date.now();

    return () => {
      recordLivenessAnalyticsEvent(componentProps, {
        event: LIVENESS_EVENT_GET_READY_SCREEN,
        attributes: { action: 'TimeSpent' },
        metrics: {
          duration: Date.now() - pageLoadTime,
        },
      });
    };
  }, [componentProps]);

  return (
    <Card
      data-amplify-liveness-detector-start=""
      className={START_CLASS_NAME}
      data-testid={START_CLASS_NAME}
    >
      <Flex direction="column">
        <Flex
          className={ComponentClassNames.Alert}
          color={`${tokens.colors.orange[80]}`}
          backgroundColor={`${tokens.colors.orange[20]}`}
          alignItems="center"
        >
          <View flex="1">
            <View className={ComponentClassNames.AlertHeading}>
              {translate('Photosensitivity Warning')}
            </View>
            <View className={ComponentClassNames.AlertBody}>
              {translate(
                'This check displays colored lights. Use caution if you are photosensitive.'
              )}
            </View>
          </View>
          <LivenessAlertIcon variation="info" />
        </Flex>
        <Text color="font.tertiary">
          {translate<string>('Follow the instructions to complete the check: ')}
        </Text>
        <Collection type="list" items={INSTRUCTIONS}>
          {(item, index) => (
            <DescriptionBullet
              key={index + 1}
              index={index + 1}
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
      </Flex>
    </Card>
  );
}
