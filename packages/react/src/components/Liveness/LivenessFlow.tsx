import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  LivenessFlowProps as LivenessFlowPropsFromUi,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
} from '@aws-amplify/ui';

import { LivenessFlowProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { View, Flex } from '../../primitives';
import { getVideoConstraints } from './StartLiveness/helpers';
import { useThemeBreakpoint } from '../../hooks/useThemeBreakpoint';

const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface LivenessFlowProps extends LivenessFlowPropsFromUi {}

export const LivenessFlow: React.FC<LivenessFlowProps> = (props) => {
  const { onUserCancel: onUserCancelFromProps, disableStartScreen = false } =
    props;
  const currElementRef = React.useRef<HTMLDivElement>(null);
  const breakpoint = useThemeBreakpoint();

  const onUserCancel = () => {
    const event = new CustomEvent('userCancel', { cancelable: true });
    onUserCancelFromProps?.(event);
  };

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      flowProps: {
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

    const isMobileScreen = breakpoint === 'base';
    const videoConstraints = getVideoConstraints(
      isMobileScreen,
      currElementRef.current.clientWidth
    );

    send({
      type: 'BEGIN',
      data: { videoConstraints },
    });
  }, [send, breakpoint, props]);

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
      <LivenessFlowProvider flowProps={props} service={service}>
        <Flex direction="column" ref={currElementRef}>
          {isStartView ? (
            <StartLiveness beginLivenessCheck={beginLivenessCheck} />
          ) : (
            <LivenessCheck />
          )}
        </Flex>
      </LivenessFlowProvider>
    </View>
  );
};
