import * as React from 'react';
import {
  LivenessInterpreter,
  FaceLivenessDetectorProps,
} from '@aws-amplify/ui';

interface FaceLivenessDetectorContextType {
  flowProps: FaceLivenessDetectorProps;
  service: LivenessInterpreter;
}

const FaceLivenessDetectorContext =
  React.createContext<FaceLivenessDetectorContextType>(undefined);

export function FaceLivenessDetectorProvider({
  children,
  ...props
}: React.PropsWithChildren<FaceLivenessDetectorContextType>): JSX.Element {
  return (
    <FaceLivenessDetectorContext.Provider value={props}>
      {children}
    </FaceLivenessDetectorContext.Provider>
  );
}

export function useFaceLivenessDetector(): FaceLivenessDetectorContextType {
  const props = React.useContext(FaceLivenessDetectorContext);
  if (props === undefined) {
    throw new Error(
      'useFaceLivenessDetector must be used within a FaceLivenessDetectorProvider'
    );
  }

  return props;
}
