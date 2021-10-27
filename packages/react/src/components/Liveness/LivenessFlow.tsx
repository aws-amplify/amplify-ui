import * as React from 'react';
import { useActor, useInterpret } from '@xstate/react';
import { livenessMachine, LivenessFlowProps } from '@aws-amplify/ui';
import { LivenessFlowProvider } from './providers';
import { StartLiveness } from './StartLiveness';
import { LivenessCheck } from './LivenessCheck';

export const LivenessFlow: React.FC<LivenessFlowProps> = (props) => {
  const service = useInterpret(livenessMachine, {
    devTools: process.env.NODE_ENV === 'development',
    context: {
      flowProps: props,
    },
  });
  const [state] = useActor(service);

  return (
    <LivenessFlowProvider flowProps={props} service={service}>
      {state.matches('start') ? <StartLiveness /> : <LivenessCheck />}
    </LivenessFlowProvider>
  );
};
