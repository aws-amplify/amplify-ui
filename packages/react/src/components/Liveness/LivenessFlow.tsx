import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import {
  livenessMachine,
  LivenessFlowProps as LivenessFlowPropsFromUi,
} from '@aws-amplify/ui';

import { useControllable } from '../../hooks/useControllable';
import { LivenessFlowProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';
import { View } from '../../primitives';

export interface LivenessFlowProps extends LivenessFlowPropsFromUi {}

export const LivenessFlow: React.FC<LivenessFlowProps> = (props) => {
  const {
    active: activeFromProps,
    onExit: onExitFromProps,
    onUserCancel: onUserCancelFromProps,
  } = props;

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
  const [state] = useActor(service);
  const isStartView = state.matches('start') || state.matches('userCancel');

  return active ? (
    <View data-amplify-liveness-flow="" data-testid="liveness-flow">
      <LivenessFlowProvider flowProps={props} service={service}>
        {isStartView ? <StartLiveness /> : <LivenessCheck />}
      </LivenessFlowProvider>
    </View>
  ) : null;
};
