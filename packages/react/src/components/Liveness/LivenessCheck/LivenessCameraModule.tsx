import React, { useState, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { LIVENESS_EVENT_LIVENESS_CHECK_SCREEN } from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
  useMediaStreamInVideo,
} from '../hooks';
import { CancelButton, Instruction, RecordingIcon, Overlay } from '../shared';
import { isFirefox, isAndroid, isIOS } from '../utils/device';
import { Flex, Loader, Text, View } from '../../../primitives';

export const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);
export const selectVideoStream = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoMediaStream
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  isRecordingStopped: boolean;
}

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const { isMobileScreen, isRecordingStopped } = props;

  const { tokens } = useTheme();
  const [state, send] = useLivenessActor();

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);

  const { videoRef, videoHeight, videoWidth } = useMediaStreamInVideo(
    videoStream,
    videoConstraints
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freshnessColorRef = useRef<HTMLDivElement | null>(null);

  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  const isCheckingCamera = state.matches('cameraCheck');
  const isNotRecording = state.matches('notRecording');
  const isRecording = state.matches('recording');

  /**
   * Temp fix: Firefox on Android + iOS returns opposite values you'd expect
   * from getUserMedia().
   */
  const shouldFlipValues = (isAndroid() && isFirefox()) || isIOS();

  const mediaHeight = shouldFlipValues ? videoWidth : videoHeight;
  const mediaWidth = shouldFlipValues ? videoHeight : videoWidth;

  React.useLayoutEffect(() => {
    if (isCameraReady) {
      send({
        type: 'SET_DOM_AND_CAMERA_DETAILS',
        data: {
          videoEl: videoRef.current,
          canvasEl: canvasRef.current,
          freshnessColorEl: freshnessColorRef.current,
          isMobile: isMobileScreen,
        },
      });
    }
  }, [send, videoRef, isCameraReady, isMobileScreen]);

  const timerCompleteHandler = () => {
    send({ type: 'START_RECORDING' });
  };

  const handleMediaPlay = () => {
    setIsCameraReady(true);
    setCountDownRunning(true);
  };

  const centeredLoader = (
    <View
      position="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%,-50%)"
      data-testid="centered-loader"
    >
      <Loader size="large" />
    </View>
  );

  if (isCheckingCamera) {
    return (
      <Flex height={videoHeight} width="100%" position="relative">
        {centeredLoader}
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      position={isMobileScreen ? 'fixed' : 'relative'}
      backgroundColor="black"
      {...(isMobileScreen && {
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      })}
    >
      {!isCameraReady && centeredLoader}

      <View
        as="canvas"
        ref={freshnessColorRef}
        height="100%"
        width="100%"
        position="fixed"
        top={0}
        left={0}
        style={{
          pointerEvents: 'none',
          zIndex: 1,
        }}
        hidden
      />

      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        style={{
          transform: 'scaleX(-1)',
          // Height and width are duplicated here in the style object to address
          // a safari bug where video size resets with amplify class unset rule.
          height: `${mediaHeight}px`,
          width: `${mediaWidth}px`,
        }}
        height={mediaHeight}
        width={mediaWidth}
        onCanPlay={handleMediaPlay}
        data-testid="video"
        className={isRecordingStopped ? 'amplify-liveness-fade-out' : null}
      />
      <Flex
        direction="column"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        className={isRecordingStopped ? 'amplify-liveness-fade-out' : null}
      >
        <View
          as="canvas"
          ref={canvasRef}
          height={mediaHeight}
          width={mediaWidth}
        />
      </Flex>

      {isRecording && (
        <View
          style={{ zIndex: 1 }}
          position="absolute"
          top="medium"
          left="medium"
        >
          <RecordingIcon />
        </View>
      )}

      <View
        style={{ zIndex: 2 }}
        position="absolute"
        top="medium"
        right="medium"
      >
        <CancelButton sourceScreen={LIVENESS_EVENT_LIVENESS_CHECK_SCREEN} />
      </View>
      {countDownRunning && (
        <Overlay
          style={{ zIndex: 1 }}
          anchorOrigin={{ horizontal: 'center', vertical: 'end' }}
        >
          <Instruction />

          {isNotRecording && (
            <View
              backgroundColor="background.primary"
              borderRadius="100%"
              padding="8px"
            >
              <CountdownCircleTimer
                isPlaying={isNotRecording}
                size={85}
                strokeWidth={8}
                duration={3}
                rotation="counterclockwise"
                // FIXME: colors is hard coded because it only allows a hex value
                colors="#40aabf"
                trailColor={`${tokens.colors.background.primary}`}
                onComplete={timerCompleteHandler}
              >
                {({ remainingTime }) => (
                  <Text fontSize="xxxl" fontWeight="bold">
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          )}
        </Overlay>
      )}
    </Flex>
  );
};
