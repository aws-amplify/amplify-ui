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
import { CancelButton, Instruction, RecordingIcon } from '../shared';
import { Flex, Loader, Text, View } from '../../../primitives';

export const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);
export const selectVideoStream = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoMediaStream
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
}

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const { isMobileScreen } = props;

  const { tokens } = useTheme();
  const [state, send] = useLivenessActor();

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);

  const { videoRef, videoHeight, videoWidth, streamOffset } =
    useMediaStreamInVideo(videoStream, videoConstraints);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  const isCheckingCamera = state.matches('cameraCheck');
  const isNotRecording = state.matches('notRecording');
  const isRecording = state.matches('recording');

  const timerCompleteHandler = () => {
    send({
      type: 'START_RECORDING',
      data: {
        videoEl: videoRef.current,
        canvasEl: canvasRef.current,
      },
    });
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
      {...(isMobileScreen && {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
      })}
    >
      <Flex direction="column" position="relative">
        {!isCameraReady && centeredLoader}

        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          height={videoHeight}
          width={videoWidth}
          style={{ transform: 'scaleX(-1)' }}
          onCanPlay={handleMediaPlay}
          data-testid="video"
        />
        <View
          as="canvas"
          ref={canvasRef}
          height={videoHeight}
          width={videoWidth}
          position="absolute"
          top={0}
          {...(isMobileScreen && {
            style: {
              background: 'linear-gradient(transparent 70%, white 100%)',
            },
          })}
        />

        {isRecording && (
          <View position="absolute" top={10} left={10}>
            <RecordingIcon />
          </View>
        )}

        <View position="absolute" top={10} right={10}>
          <CancelButton sourceScreen={LIVENESS_EVENT_LIVENESS_CHECK_SCREEN} />
        </View>
      </Flex>
      {countDownRunning && (
        <Flex
          direction="column"
          alignItems="center"
          position={'absolute'}
          bottom={isMobileScreen ? streamOffset + 10 : 10}
        >
          <Instruction />

          {isNotRecording && (
            <View
              backgroundColor={`${tokens.colors.background.primary}`}
              borderRadius={'100%'}
            >
              <CountdownCircleTimer
                isPlaying={isNotRecording}
                size={85}
                strokeWidth={8}
                duration={3}
                rotation="counterclockwise"
                // FIXME: colors is hard coded because it only allows a hex value
                colors={'#005566'}
                trailColor={`${tokens.colors.background.primary}`}
                onComplete={timerCompleteHandler}
              >
                {({ remainingTime }) => (
                  <Text
                    fontSize={`${tokens.fontSizes.xxxl}`}
                    fontWeight={`${tokens.fontWeights.bold}`}
                  >
                    {remainingTime}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          )}
        </Flex>
      )}
    </Flex>
  );
};
