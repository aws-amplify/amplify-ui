import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  LivenessFlowProps as LivenessFlowPropsFromUi,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
} from '@aws-amplify/ui';

import { useControllable } from '../../hooks/useControllable';
import { LivenessFlowProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { View, Flex } from '../../primitives';
import { getVideoConstraints } from './StartLiveness/helpers';
import { useThemeBreakpoint } from '../../hooks/useThemeBreakpoint';

export const DETECTOR_CLASS_NAME = 'liveness-detector';

export interface LivenessFlowProps extends LivenessFlowPropsFromUi {}

export const LivenessFlow: React.FC<LivenessFlowProps> = (props) => {
  const {
    active: activeFromProps,
    onExit: onExitFromProps,
    onUserCancel: onUserCancelFromProps,
    disableStartScreen = false,
  } = props;
  const currElementRef = React.useRef<HTMLDivElement>(null);
  const breakpoint = useThemeBreakpoint();

  const [active, setActive] = useControllable({
    controlledValue: activeFromProps,
    handler: onExitFromProps,
    defaultValue: true,
    propertyDescription: {
      componentName: 'LivenessFlow',
      controlledProp: 'active',
      changeHandler: 'onExit',
    },
  });

  const onExit = () => {
    setActive(false);
    onExitFromProps?.();
  };

  const onUserCancel = () => {
    const event = new CustomEvent('userCancel', { cancelable: true });
    onUserCancelFromProps?.(event);

    if (!event.defaultPrevented) {
      onExit();
    }
  };

  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      flowProps: {
        ...props,
        onExit,
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
    if (disableStartScreen && active) {
      recordLivenessAnalyticsEvent(props, {
        event: LIVENESS_EVENT_DISABLED_GET_READY_SCREEN,
        attributes: { action: 'AttemptLiveness' },
        metrics: { count: 1 },
      });

      beginLivenessCheck();
    }
  }, [beginLivenessCheck, disableStartScreen, active, props]);

  return active ? (
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
  ) : null;
};
