import * as React from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi } from './service';
import FaceLivenessDetectorCore from './FaceLivenessDetectorCore';
import { LivenessDisplayText } from './displayText';
import { FaceLivenessDetectorComponents } from './shared/DefaultStartScreenComponents';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

const credentialProvider = async () => {
  const { credentials } = await fetchAuthSession();
  if (!credentials) {
    throw new Error('No credentials provided');
  }
  return credentials;
};

export default function FaceLivenessDetector(
  props: FaceLivenessDetectorProps
): JSX.Element {
  const { config, ...rest } = props;
  return (
    <FaceLivenessDetectorCore
      {...rest}
      config={{ credentialProvider, ...config }}
    />
  );
}
