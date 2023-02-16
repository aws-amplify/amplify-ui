import * as React from 'react';
import { translate, LivenessErrorState } from '@aws-amplify/ui';

import { LivenessCameraModule } from './LivenessCameraModule';
import {
  createLivenessSelector,
  useLivenessActor,
  useLivenessSelector,
} from '../hooks';
import { isMobileScreen, getLandscapeMediaQuery } from '../utils/device';
import { Text, Flex, View, Button } from '../../../primitives';
import { CancelButton } from '../shared/CancelButton';

const CHECK_CLASS_NAME = 'liveness-detector-check';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectIsRecordingStopped = createLivenessSelector(
  (state) => state.context.isRecordingStopped
);

export const LivenessCheck: React.FC = () => {
  const [state, send] = useLivenessActor();
  const errorState = useLivenessSelector(selectErrorState);
  const isRecordingStopped = useLivenessSelector(selectIsRecordingStopped);

  const isPermissionDenied = state.matches('permissionDenied');
  const isMobile = isMobileScreen();

  const recheckCameraPermissions = () => {
    send({ type: 'RETRY_CAMERA_CHECK' });
  };

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
      return (
        <Flex
          backgroundColor="background.primary"
          direction="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          width="100%"
          height={480}
        />
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
              ? translate('Camera does not meet minimum specifications')
              : translate('Camera not accessible.')}
          </Text>
          <Text maxWidth={300}>
            {errorState === LivenessErrorState.CAMERA_FRAMERATE_ERROR
              ? translate(
                  'Camera must support at least 320*240 resolution and 15 frames per second.'
                )
              : translate(
                  'Make sure camera is connected, and camera permissions allowed in system settings, before retrying.'
                )}
          </Text>
          <Button
            variation="primary"
            type="button"
            onClick={recheckCameraPermissions}
          >
            {translate('Retry')}
          </Button>
          <View position="absolute" top="medium" right="medium">
            <CancelButton />
          </View>
        </Flex>
      );
    } else {
      return (
        <LivenessCameraModule
          isMobileScreen={isMobile}
          isRecordingStopped={isRecordingStopped}
        />
      );
    }
  };

  return (
    <Flex
      direction="column"
      position="relative"
      data-amplify-liveness-detector-check=""
      data-testid={CHECK_CLASS_NAME}
      className={CHECK_CLASS_NAME}
    >
      {renderCheck()}
    </Flex>
  );
};
