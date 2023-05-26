import * as React from 'react';
import { Credentials as AmplifyCredentials } from '@aws-amplify/core';
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

export default function FaceLivenessDetector(
  props: FaceLivenessDetectorProps
): JSX.Element {
  const amplifyCredentialsProvider = async () => {
    const credentials =
      (await AmplifyCredentials.get()) as AwsTemporaryCredentials;
    return credentials;
  };

  const { config } = props;
  return (
    <FaceLivenessDetectorCore
      {...props}
      config={{ credentialProvider: amplifyCredentialsProvider, ...config }}
    />
  );
}
