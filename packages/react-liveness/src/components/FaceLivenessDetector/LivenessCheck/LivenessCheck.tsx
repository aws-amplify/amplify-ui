import * as React from 'react';

import { Text, Flex, View, Button } from '@aws-amplify/ui-react';

import { LivenessErrorState } from '../service';
import { LivenessCameraModule } from './LivenessCameraModule';
import {
  createLivenessSelector,
  useLivenessActor,
  useLivenessSelector,
} from '../hooks';
import {
  isMobileScreen,
  getLandscapeMediaQuery,
  getMinAspectRatioMediaQuery,
  isMobileDeviceInLandscape,
} from '../utils/device';
import { CancelButton } from '../shared/CancelButton';
import {
  InstructionDisplayText,
  HintDisplayText,
  CameraDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
  defaultErrorDisplayText,
} from '../displayText';
import { LandscapeErrorModal } from '../shared/LandscapeErrorModal';
import { selectErrorState } from '../shared';
import { FaceLivenessDetectorComponents } from '../shared/DefaultStartScreenComponents';

const CHECK_CLASS_NAME = 'liveness-detector-check';

const CAMERA_ERROR_TEXT_WIDTH = 420;

export const selectIsRecordingStopped = createLivenessSelector(
  (state) => state.context.isRecordingStopped
);

interface LivenessCheckProps {
  instructionDisplayText: Required<InstructionDisplayText>;
  hintDisplayText: Required<HintDisplayText>;
  cameraDisplayText: Required<CameraDisplayText>;
  streamDisplayText: Required<StreamDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
  components?: FaceLivenessDetectorComponents;
}

export const LivenessCheck: React.FC<LivenessCheckProps> = ({
  instructionDisplayText,
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

      const handleMediaQueryChange = () => {
        const shouldShowWarning = isMobileDeviceInLandscape();
        sendLandscapeWarning(shouldShowWarning);
      };

      // Get orientation: landscape media query
      const landscapeMediaQuery = getLandscapeMediaQuery();
      const minAspectRatioMediaQuery = getMinAspectRatioMediaQuery();

      // Send warning based on initial orientation
      handleMediaQueryChange();

      // Listen for future orientation changes and send warning
      landscapeMediaQuery.addEventListener('change', handleMediaQueryChange);

      // Listen for future min asepct ratio changes and send warning
      minAspectRatioMediaQuery.addEventListener(
        'change',
        handleMediaQueryChange
      );

      // Remove matchMedia event listener
      return () => {
        landscapeMediaQuery.removeEventListener(
          'change',
          handleMediaQueryChange
        );
        minAspectRatioMediaQuery.removeEventListener(
          'change',
          handleMediaQueryChange
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
              });
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
          <Text maxWidth={CAMERA_ERROR_TEXT_WIDTH}>
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
          isRecordingStopped={isRecordingStopped!}
          instructionDisplayText={instructionDisplayText}
          streamDisplayText={streamDisplayText}
          hintDisplayText={hintDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
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
      gap="xl"
    >
      {renderCheck()}
    </Flex>
  );
};
