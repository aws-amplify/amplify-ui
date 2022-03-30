import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { LIVENESS_EVENT_LIVENESS_CHECK_SCREEN } from '@aws-amplify/ui';

import { useTheme } from '../../../hooks';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
} from '../hooks';
import { CancelButton, Instruction, RecordingIcon } from '../shared';
import { Flex, Loader, Text, View } from '../../../primitives';

const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
}

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const { isMobileScreen } = props;

  const videoConstraints = useLivenessSelector(selectVideoConstraints);
  const height = (videoConstraints.height as ConstrainULongRange).ideal;
  const width = (videoConstraints.width as ConstrainULongRange).ideal;

  const { tokens } = useTheme();
  const [state, send] = useLivenessActor();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const [videoHeight, setVideoHeight] = useState<number>(height);
  const [videoWidth, setVideoWidth] = useState<number>(width);
  const [streamOffset, setStreamOffset] = useState<number>(0);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  const isCheckingCamera = state.matches('cameraCheck');
  const isNotRecording = state.matches('notRecording');
  const isRecording = state.matches('recording');

  const timerCompleteHandler = () => {
    send({
      type: 'START_RECORDING',
      data: {
        videoEl: webcamRef.current.video,
        canvasEl: canvasRef.current,
        videoMediaStream: webcamRef.current.stream,
      },
    });
  };

  const onMediaAvailable = () => {
    const { height: streamHeight, width: streamWidth } =
      webcamRef.current.stream.getTracks()[0].getSettings();
    const offsetHeight = window.innerHeight - streamHeight;

    setVideoHeight(streamHeight);
    setVideoWidth(streamWidth);
    setStreamOffset(offsetHeight <= 0 ? 0 : offsetHeight / 2);
  };

  const canMediaPlayHandler = () => {
    setIsCameraReady(true);
    setCountDownRunning(true);
  };

  const centeredLoader = (
    <View
      position="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%,-50%)"
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

        <Webcam
          ref={webcamRef}
          audio={false}
          audioConstraints={false}
          allowFullScreen
          videoConstraints={videoConstraints}
          height={videoHeight}
          width={videoWidth}
          mirrored
          onUserMedia={onMediaAvailable}
          onUserMediaError={() => send({ type: 'PERMISSION_DENIED' })}
          onCanPlay={canMediaPlayHandler}
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

        {isMobileScreen && (
          <View position="absolute" top={10} right={10}>
            <CancelButton
              isMobileScreen={true}
              sourceScreen={LIVENESS_EVENT_LIVENESS_CHECK_SCREEN}
            />
          </View>
        )}
      </Flex>
      {countDownRunning && (
        <Flex
          direction="column"
          alignItems="center"
          position={isMobileScreen ? 'absolute' : 'relative'}
          bottom={isMobileScreen ? streamOffset + 10 : 10}
        >
          <Instruction isMobileScreen={isMobileScreen} />

          {isNotRecording && (
            <CountdownCircleTimer
              isPlaying={isNotRecording}
              size={85}
              strokeWidth={8}
              duration={3}
              rotation="counterclockwise"
              // TODO:: using hardcoded colors for now since it requires hex value
              colors={'#000000'}
              trailColor={'#909090'}
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
          )}
        </Flex>
      )}
    </Flex>
  );
};
