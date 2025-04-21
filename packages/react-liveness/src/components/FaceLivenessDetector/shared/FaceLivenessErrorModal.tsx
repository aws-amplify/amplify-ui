import React from 'react';

import { Flex, Button, Text } from '@aws-amplify/ui-react';
import { AlertIcon } from '@aws-amplify/ui-react/internal';

import type { ErrorState } from '../service';
import { LivenessErrorState } from '../service';

import { Toast } from './Toast';
import { Overlay } from './Overlay';
import type { ErrorDisplayText } from '../displayText';
import { defaultErrorDisplayText } from '../displayText';
import { LivenessClassNames } from '../types/classNames';

export interface CheckScreenComponents {
  ErrorView?: React.ComponentType<FaceLivenessErrorModalProps>;
}

export interface FaceLivenessErrorModalProps {
  children: React.ReactNode;
  displayText?: Partial<ErrorDisplayText>;
  onRetry: () => void;
}

const renderToastErrorModal = (props: {
  error: ErrorState;
  displayText: Required<ErrorDisplayText>;
}) => {
  const { error: errorState, displayText } = props;

  const {
    connectionTimeoutHeaderText,
    connectionTimeoutMessageText,
    errorLabelText,
    timeoutHeaderText,
    timeoutMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    multipleFacesHeaderText,
    multipleFacesMessageText,
    clientHeaderText,
    clientMessageText,
    serverHeaderText,
    serverMessageText,
  } = displayText;

  let heading: string;
  let message: string;

  switch (errorState) {
    case LivenessErrorState.CONNECTION_TIMEOUT:
      heading = connectionTimeoutHeaderText;
      message = connectionTimeoutMessageText;
      break;
    case LivenessErrorState.TIMEOUT:
      heading = timeoutHeaderText;
      message = timeoutMessageText;
      break;
    case LivenessErrorState.FACE_DISTANCE_ERROR:
      heading = faceDistanceHeaderText;
      message = faceDistanceMessageText;
      break;
    case LivenessErrorState.MULTIPLE_FACES_ERROR:
      heading = multipleFacesHeaderText;
      message = multipleFacesMessageText;
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
      <Flex className={LivenessClassNames.ErrorModal}>
        <AlertIcon ariaLabel={errorLabelText} role="img" variation="error" />
        <Text
          className={LivenessClassNames.ErrorModalHeading}
          id="amplify-liveness-error-heading"
        >
          {heading}
        </Text>
      </Flex>
      <Text id="amplify-liveness-error-message">{message}</Text>
    </>
  );
};

export const renderErrorModal = ({
  errorState,
  overrideErrorDisplayText,
}: {
  errorState: ErrorState;
  overrideErrorDisplayText?: ErrorDisplayText;
}): React.JSX.Element | null => {
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
};

export const FaceLivenessErrorModal: React.FC<FaceLivenessErrorModalProps> = (
  props
) => {
  const { children, onRetry, displayText: overrideErrorDisplayText } = props;

  const displayText: ErrorDisplayText = {
    ...defaultErrorDisplayText,
    ...overrideErrorDisplayText,
  };

  const { tryAgainText } = displayText;

  return (
    <Overlay className={LivenessClassNames.OpaqueOverlay}>
      <Toast
        aria-labelledby="amplify-liveness-error-heading"
        aria-describedby="amplify-liveness-error-message"
        role="alertdialog"
      >
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
