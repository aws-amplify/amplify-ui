import React from 'react';

import { Flex, Button, Text } from '@aws-amplify/ui-react';
import { AlertIcon } from '@aws-amplify/ui-react/internal';

import { LivenessErrorState } from '../service';

import { Toast } from './Toast';
import { Overlay } from './Overlay';
import { defaultErrorDisplayText, ErrorDisplayText } from '../displayText';

export interface CheckScreenComponents {
  ErrorView?: React.ComponentType<FaceLivenessErrorModalProps>;
}

export interface FaceLivenessErrorModalProps {
  children: React.ReactNode;
  displayText?: Partial<ErrorDisplayText>;
  onRetry: () => void;
}

const renderToastErrorModal = (props: {
  error: LivenessErrorState;
  displayText: Required<ErrorDisplayText>;
}) => {
  const { error: errorState, displayText } = props;

  const {
    timeoutHeaderText,
    timeoutMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    clientHeaderText,
    clientMessageText,
    serverHeaderText,
    serverMessageText,
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
    <>
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
    </>
  );
};

export const renderErrorModal = ({ errorState, overrideErrorDisplayText }: {
  errorState: LivenessErrorState;
  overrideErrorDisplayText?: ErrorDisplayText;
}): JSX.Element | null => {
  const displayText: Required<ErrorDisplayText> = {
    ...defaultErrorDisplayText,
    ...overrideErrorDisplayText,
  };

  if (
    errorState === LivenessErrorState.CAMERA_ACCESS_ERROR ||
    errorState === LivenessErrorState.CAMERA_FRAMERATE_ERROR ||
    errorState === LivenessErrorState.MOBILE_LANDSCAPE_ERROR
  ) {
    return null;
  } else {
    return renderToastErrorModal({
      error: errorState,
      displayText,
    });
  }
}

export const FaceLivenessErrorModal: React.FC<FaceLivenessErrorModalProps> = (
  props
) => {
  const { children, onRetry, displayText: overrideErrorDisplayText } = props;

  const displayText: ErrorDisplayText = {
    ...defaultErrorDisplayText,
    ...overrideErrorDisplayText,
  };

  const {
    tryAgainText,
  } = displayText;

  return (
    <Overlay backgroundColor="overlay.40">
      <Toast>
        {children}
        <Flex justifyContent="center">
          <Button variation="primary" type="button" onClick={onRetry}>
            {tryAgainText}
          </Button>
        </Flex>
      </Toast>
    </Overlay>
  );
};
