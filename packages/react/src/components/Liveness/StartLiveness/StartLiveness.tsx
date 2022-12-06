import * as React from 'react';
import {
  translate,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_GET_READY_SCREEN,
} from '@aws-amplify/ui';

import { useFaceLivenessDetector } from '../providers';
import { Flex, Button, Card } from '../../../primitives';
import { LivenessComponents } from '../hooks/useCustomComponents/defaultComponents';

const START_CLASS_NAME = 'liveness-detector-start';

export interface StartLivenessProps {
  beginLivenessCheck: () => void;
  components?: LivenessComponents;
}

export function StartLiveness(props: StartLivenessProps): JSX.Element {
  const { beginLivenessCheck, components } = props;
  const { PhotosensitiveWarning, LivenessInstructions } = components;
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
        <PhotosensitiveWarning />
        <LivenessInstructions />
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
