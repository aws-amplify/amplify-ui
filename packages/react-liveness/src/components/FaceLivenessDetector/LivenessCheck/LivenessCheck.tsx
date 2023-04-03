import * as React from 'react';

import { Text, Flex, View, Button } from '@aws-amplify/ui-react';

import { LivenessErrorState } from '../service';
import { LivenessCameraModule } from './LivenessCameraModule';
import {
  createLivenessSelector,
  useLivenessActor,
  useLivenessSelector,
} from '../hooks';
import { isMobileScreen, getLandscapeMediaQuery } from '../utils/device';
import { CancelButton } from '../shared/CancelButton';
import {
  HintDisplayText,
  CameraDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
  defaultErrorDisplayText,
} from '../displayText';
import { LandscapeErrorModal } from '../shared/LandscapeErrorModal';
import { CheckScreenComponents } from '../shared/FaceLivenessErrorModal';

const CHECK_CLASS_NAME = 'liveness-detector-check';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectIsRecordingStopped = createLivenessSelector(
  (state) => state.context.isRecordingStopped
);

interface LivenessCheckProps {
  hintDisplayText: Required<HintDisplayText>;
  cameraDisplayText: Required<CameraDisplayText>;
  streamDisplayText: Required<StreamDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
  components?: CheckScreenComponents;
}

export const LivenessCheck: React.FC<LivenessCheckProps> = ({
  hintDisplayText,
  cameraDisplayText,
  streamDisplayText,
  errorDisplayText,
  components,
}: LivenessCheckProps) => {
  const [state, send] = useLivenessActor();
  const errorState = useLivenessSelector(selectErrorState);
  const isRecordingStopped = useLivenessSelector(selectIsRecordingStopped);

  const isPermissionDenied = state.matches('permissionDenied');
  const isMobile = isMobileScreen();

  const recheckCameraPermissions = () => {
    send({ type: 'RETRY_CAMERA_CHECK' });
  };

  const {
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    retryCameraPermissionsText,
  } = cameraDisplayText;

  const { cancelLivenessCheckText } = streamDisplayText;

  React.useLayoutEffect(() => {
    if (isMobile) {
      const sendLandscapeWarning = (isLandscapeMatched: boolean) => {
        if (isLandscapeMatched) {
          send({ type: 'MOBILE_LANDSCAPE_WARNING' });
        }
      };

      // Get orientation: landscape media query
      const landscapeMediaQuery = getLandscapeMediaQuery();

      // Send warning based on initial orientation
      sendLandscapeWarning(landscapeMediaQuery.matches);

      // Listen for future orientation changes and send warning
      landscapeMediaQuery.addEventListener('change', (e) => {
        sendLandscapeWarning(e.matches);
      });

      // Remove matchMedia event listener
      return () => {
        landscapeMediaQuery.removeEventListener('change', (e) =>
          sendLandscapeWarning(e.matches)
        );
      };
    }
  }, [isMobile, send]);

  const renderCheck = () => {
    if (errorState === LivenessErrorState.MOBILE_LANDSCAPE_ERROR) {
      const displayText: Required<ErrorDisplayText> = {
        ...defaultErrorDisplayText,
        ...errorDisplayText,
      };
      const {
        landscapeHeaderText,
        portraitMessageText,
        landscapeMessageText,
        tryAgainText,
      } = displayText;
      return (
        <Flex
          backgroundColor="background.primary"
          direction="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width="100%"
        >
          <LandscapeErrorModal
            header={landscapeHeaderText}
            portraitMessage={portraitMessageText}
            landscapeMessage={landscapeMessageText}
            tryAgainText={tryAgainText}
            onRetry={() => {
              send({
                type: 'CANCEL',
              })
            }}
          />
        </Flex>
      );
    } else if (isPermissionDenied) {
      return (
        <Flex
          backgroundColor="background.primary"
          direction="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height={480}
        >
          <Text fontSize="large" fontWeight="bold">
            {errorState === LivenessErrorState.CAMERA_FRAMERATE_ERROR
              ? cameraMinSpecificationsHeadingText
              : cameraNotFoundHeadingText}
          </Text>
          <Text maxWidth={300}>
            {errorState === LivenessErrorState.CAMERA_FRAMERATE_ERROR
              ? cameraMinSpecificationsMessageText
              : cameraNotFoundMessageText}
          </Text>
          <Button
            variation="primary"
            type="button"
            onClick={recheckCameraPermissions}
          >
            {retryCameraPermissionsText}
          </Button>
          <View position="absolute" top="medium" right="medium">
            <CancelButton ariaLabel={cancelLivenessCheckText}></CancelButton>
          </View>
        </Flex>
      );
    } else {
      return (
        <LivenessCameraModule
          isMobileScreen={isMobile}
          isRecordingStopped={isRecordingStopped}
          streamDisplayText={streamDisplayText}
          hintDisplayText={hintDisplayText}
          errorDisplayText={errorDisplayText}
          components={components}
        />
      );
    }
  };

  return (
    <Flex
      direction="column"
      position="relative"
      testId={CHECK_CLASS_NAME}
      className={CHECK_CLASS_NAME}
    >
      {renderCheck()}
    </Flex>
  );
};
