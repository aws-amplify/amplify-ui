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

const credentialProvider = async () => {
  const credentials =
    (await AmplifyCredentials.get()) as AwsTemporaryCredentials;
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
