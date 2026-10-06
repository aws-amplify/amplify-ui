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
import type {
  InstructionDisplayText,
  HintDisplayText,
  CameraDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
} from '../displayText';
import { defaultErrorDisplayText } from '../displayText';
import { LandscapeErrorModal } from '../shared/LandscapeErrorModal';
import { selectErrorState } from '../shared';
import type { FaceLivenessDetectorComponents } from '../shared/DefaultStartScreenComponents';

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
    if (!isMobile) {
      return;
    }

    // screen.orientation is unsupported in Safari, so orientation is observed
    // through a media query instead
    const landscapeMediaQuery = getLandscapeMediaQuery();

    const handleOrientation = (isLandscapeMatched: boolean) => {
      if (isLandscapeMatched) {
        send({ type: 'MOBILE_LANDSCAPE_WARNING' });
      }
      // ignored outside an active check; during one it drives the non-fatal
      // "hold your device still" prompt
      send({
        type: 'ORIENTATION_CHANGED',
        data: { orientation: isLandscapeMatched ? 'landscape' : 'portrait' },
      });
    };

    handleOrientation(landscapeMediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      handleOrientation(event.matches);
    };
    landscapeMediaQuery.addEventListener('change', onChange);

    return () => {
      landscapeMediaQuery.removeEventListener('change', onChange);
    };
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
          {components?.CancelButton !== null && (
            <View position="absolute" top="medium" right="medium">
              <CancelButton
                ariaLabel={cancelLivenessCheckText}
                Component={components?.CancelButton}
              ></CancelButton>
            </View>
          )}
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
