import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
} from '@aws-amplify/ui';

import { FaceLivenessDetectorProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { View, Flex } from '../../primitives';
import { getVideoConstraints } from './StartLiveness/helpers';
import { isMobileScreen } from './utils/device';
import { LivenessComponents } from './hooks/useCustomComponents/defaultComponents';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: LivenessComponents;
}

export const FaceLivenessDetector: React.FC<FaceLivenessDetectorProps> = (
  props
) => {
  const {
    onUserCancel: onUserCancelFromProps,
    disableStartScreen = false,
    components,
  } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);

  const onUserCancel = () => {
    const event = new CustomEvent('userCancel', { cancelable: true });
    onUserCancelFromProps?.(event);
  };

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      componentProps: {
        ...props,
        onUserCancel,
      },
    },
  });

  const [state, send] = useActor(service);
  const isStartView = state.matches('start') || state.matches('userCancel');

  const beginLivenessCheck = React.useCallback(() => {
    recordLivenessAnalyticsEvent(props, {
      event: LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
      attributes: { action: 'BeginLivenessCheck' },
      metrics: { count: 1 },
    });

    const isMobile = isMobileScreen();

    const videoConstraints = getVideoConstraints(
      isMobile,
      currElementRef.current.clientWidth
    );

    send({
      type: 'BEGIN',
      data: { videoConstraints },
    });
  }, [send, props]);

  React.useLayoutEffect(() => {
    if (disableStartScreen) {
      recordLivenessAnalyticsEvent(props, {
        event: LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
        attributes: { action: 'AttemptLiveness' },
        metrics: { count: 1 },
      });

      beginLivenessCheck();
    }
  }, [beginLivenessCheck, disableStartScreen, props]);

  return (
    <View
      data-amplify-liveness-detector=""
      className={DETECTOR_CLASS_NAME}
      data-testid={DETECTOR_CLASS_NAME}
    >
      <FaceLivenessDetectorProvider componentProps={props} service={service}>
        <Flex direction="column" ref={currElementRef}>
          {isStartView ? (
            <StartLiveness
              beginLivenessCheck={beginLivenessCheck}
              components={components}
            />
          ) : (
            <LivenessCheck />
          )}
        </Flex>
      </FaceLivenessDetectorProvider>
    </View>
  );
};
