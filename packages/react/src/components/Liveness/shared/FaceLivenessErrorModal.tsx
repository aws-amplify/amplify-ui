import * as React from 'react';
import {
  translate,
  LivenessErrorState,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

import { Toast } from './Toast';
import { Overlay } from './Overlay';
import { Flex, Button } from '../../../primitives';

export interface FaceLivenessErrorModalProps {
  error: Error;
  onRetry: () => void;
}

export const FaceLivenessErrorModal: React.FC<FaceLivenessErrorModalProps> = (
  props
) => {
  const { error, onRetry } = props;
  const { name: errorState } = error;

  let heading: string = null;

  switch (errorState) {
    case LivenessErrorState.TIMEOUT:
      heading = translate('Time out');
      break;
    case LivenessErrorState.FACE_DISTANCE_ERROR:
      heading = translate('Check failed during countdown');
      break;
    case LivenessErrorState.RUNTIME_ERROR:
      heading = translate('Client error');
      break;
    case LivenessErrorState.SERVER_ERROR:
    default:
      heading = translate('Server Issue');
  }

  return (
    <Overlay backgroundColor="overlay.40">
      <Toast heading={heading} variation="error">
        {errorState && LivenessErrorStateStringMap[errorState]}
        <Flex justifyContent="center">
          <Button variation="primary" type="button" onClick={onRetry}>
            {translate('Try again')}
          </Button>
        </Flex>
      </Toast>
    </Overlay>
  );
};
