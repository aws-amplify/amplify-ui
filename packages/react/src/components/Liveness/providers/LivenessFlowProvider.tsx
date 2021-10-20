import * as React from 'react';
import { LivenessInterpreter, LivenessFlowProps } from '@aws-amplify/ui';

interface LivenessFlowContextType {
  flowProps: LivenessFlowProps;
  service: LivenessInterpreter;
}

const LivenessFlowContext =
  React.createContext<LivenessFlowContextType>(undefined);

export function LivenessFlowProvider({
  children,
  ...props
}: React.PropsWithChildren<LivenessFlowContextType>) {
  return (
    <LivenessFlowContext.Provider value={props}>
      {children}
    </LivenessFlowContext.Provider>
  );
}

export function useLivenessFlow() {
  const props = React.useContext(LivenessFlowContext);
  if (props === undefined) {
    throw new Error(
      'useLivenessFlow must be used within a LivenessFlowProvider'
    );
  }

  return props;
}
