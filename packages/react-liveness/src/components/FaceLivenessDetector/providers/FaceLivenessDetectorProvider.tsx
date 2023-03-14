import React from 'react';
import { LivenessInterpreter, FaceLivenessDetectorProps } from '../service';

interface FaceLivenessDetectorContextType {
  componentProps: FaceLivenessDetectorProps;
  service: LivenessInterpreter;
}

const FaceLivenessDetectorContext =
  React.createContext<FaceLivenessDetectorContextType | null>(null);

export interface FaceLivenessDetectorProviderProps
  extends FaceLivenessDetectorContextType {
  children?: React.ReactNode;
}
export function FaceLivenessDetectorProvider({
  children,
  ...props
}: FaceLivenessDetectorProviderProps): JSX.Element {
  return (
    <FaceLivenessDetectorContext.Provider value={props}>
      {children}
    </FaceLivenessDetectorContext.Provider>
  );
}

export function useFaceLivenessDetector(): FaceLivenessDetectorContextType {
  const props = React.useContext(FaceLivenessDetectorContext);
  if (props === null) {
    throw new Error(
      'useFaceLivenessDetector must be used within a FaceLivenessDetectorProvider'
    );
  }

  return props;
}
