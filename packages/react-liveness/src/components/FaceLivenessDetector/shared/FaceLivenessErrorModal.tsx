import React from 'react';

import { Flex, Button, Text } from '@aws-amplify/ui-react';
import { AlertIcon } from '@aws-amplify/ui-react/internal';

import { LivenessErrorState } from '../service';

import { Toast } from './Toast';
import { Overlay } from './Overlay';
import { LandscapeErrorModal } from './LandscapeErrorModal';
import { defaultErrorDisplayText, ErrorDisplayText } from '../displayText';

export interface FaceLivenessErrorModalProps {
  error: Error;
  displayText?: Partial<ErrorDisplayText>;
  onRetry: () => void;
}

const renderToastErrorModal = (props: {
  error: Error;
  displayText: ErrorDisplayText;
  onRetry: () => void;
}) => {
  const { error, onRetry, displayText } = props;
  const { name: errorState } = error;

  const {
    timeoutHeaderText,
    timeoutMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    clientHeaderText,
    clientMessageText,
    serverHeaderText,
    serverMessageText,
    tryAgainText,
  } = displayText;

  let heading: string;
  let message: string;

  switch (errorState) {
    case LivenessErrorState.TIMEOUT:
      heading = timeoutHeaderText;
      message = timeoutMessageText;
      break;
    case LivenessErrorState.FACE_DISTANCE_ERROR:
      heading = faceDistanceHeaderText;
      message = faceDistanceMessageText;
      break;
    case LivenessErrorState.RUNTIME_ERROR:
      heading = clientHeaderText;
      message = clientMessageText;
      break;
    case LivenessErrorState.SERVER_ERROR:
    default:
      heading = serverHeaderText;
      message = serverMessageText;
  }

  return (
    <Overlay backgroundColor="overlay.40">
      <Toast>
        <Flex
          gap="xs"
          alignItems="center"
          justifyContent="center"
          color="font.error"
        >
          <AlertIcon ariaHidden variation="error" />
          <Text fontWeight="bold">{heading}</Text>
        </Flex>
        {message}
        <Flex justifyContent="center">
          <Button variation="primary" type="button" onClick={onRetry}>
            {tryAgainText}
          </Button>
        </Flex>
      </Toast>
    </Overlay>
  );
};

export const FaceLivenessErrorModal: React.FC<FaceLivenessErrorModalProps> = (
  props
) => {
  const { error, onRetry, displayText: overrideErrorDisplayText } = props;
  const { name: errorState } = error;

  const displayText: ErrorDisplayText = {
    ...defaultErrorDisplayText,
    ...overrideErrorDisplayText,
  };

  const {
    landscapeHeaderText,
    portraitMessageText,
    landscapeMessageText,
    tryAgainText,
  } = displayText;

  if (errorState === LivenessErrorState.MOBILE_LANDSCAPE_ERROR) {
    return (
      <LandscapeErrorModal
        header={landscapeHeaderText}
        portraitMessage={portraitMessageText}
        landscapeMessage={landscapeMessageText}
        tryAgainText={tryAgainText}
        onRetry={onRetry}
      />
    );
  } else if (
    errorState === LivenessErrorState.CAMERA_ACCESS_ERROR ||
    errorState === LivenessErrorState.CAMERA_FRAMERATE_ERROR
  ) {
    return null;
  } else {
    return renderToastErrorModal({
      error,
      onRetry,
      displayText,
    });
  }
};
