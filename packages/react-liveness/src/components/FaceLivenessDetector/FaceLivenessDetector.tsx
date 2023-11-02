import * as React from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  AwsTemporaryCredentials,
  FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi,
} from './service';
import FaceLivenessDetectorCore, {
  FaceLivenessDetectorComponents,
} from './FaceLivenessDetectorCore';
import { LivenessDisplayText } from './displayText';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

const credentialProvider = async () => {
  const credentials = (await fetchAuthSession()) as AwsTemporaryCredentials;
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
