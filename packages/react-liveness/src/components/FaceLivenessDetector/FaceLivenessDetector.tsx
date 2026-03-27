import * as React from 'react';
import { useAmplifyContext } from '@aws-amplify/ui-react-core';
import type { FaceLivenessDetectorProps as FaceLivenessDetectorPropsFromUi } from './service';
import FaceLivenessDetectorCore from './FaceLivenessDetectorCore';
import type { LivenessDisplayText } from './displayText';
import type { FaceLivenessDetectorComponents } from './shared/DefaultStartScreenComponents';

export interface FaceLivenessDetectorProps
  extends FaceLivenessDetectorPropsFromUi {
  components?: FaceLivenessDetectorComponents;
  displayText?: LivenessDisplayText;
}

export default function FaceLivenessDetector(
  props: FaceLivenessDetectorProps
): React.JSX.Element {
  const amplifyContext = useAmplifyContext();
  const credentialProvider = React.useCallback(async () => {
    const { credentials } = await amplifyContext!.fetchAuthSession();
    if (!credentials) {
      throw new Error('No credentials provided');
    }
    return credentials;
  }, [amplifyContext]);

  const { config, ...rest } = props;
  return (
    <FaceLivenessDetectorCore
      {...rest}
      config={{ credentialProvider, ...config }}
    />
  );
}
