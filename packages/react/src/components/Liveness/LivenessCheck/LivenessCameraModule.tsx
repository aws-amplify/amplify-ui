import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useActor } from '@xstate/react';

import { useLivenessFlow } from '../providers';
import { CancelButton, Instruction, RecordingIcon } from '../shared';
import { Flex, View } from '../../..';

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  videoConstraints: MediaTrackConstraints;
}

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const { isMobileScreen, videoConstraints } = props;
  const height = (videoConstraints.height as ConstrainULongRange).ideal;
  const width = (videoConstraints.width as ConstrainULongRange).ideal;

  const { service } = useLivenessFlow();
  const [state, send] = useActor(service);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const [videoHeight, setVideoHeight] = useState<number>(height);
  const [videoWidth, setVideoWidth] = useState<number>(width);
  const [top, setTop] = useState<number>(0);

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
    const offsetHeight = height - streamHeight;

    setVideoHeight(streamHeight);
    setVideoWidth(streamWidth);
    setTop(offsetHeight <= 0 ? 0 : offsetHeight / 2);
    send({
      type: 'PERMISSION_GRANTED',
    });
  };

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
      })}
    >
      <Flex direction="column" position="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          allowFullScreen
          videoConstraints={videoConstraints}
          height={height}
          width={width}
          mirrored
          onUserMedia={onMediaAvailable}
          onUserMediaError={() => send({ type: 'PERMISSION_DENIED' })}
          onCanPlay={() => setCountDownRunning(true)}
        />
        <canvas
          ref={canvasRef}
          style={{
            height: videoHeight,
            width: videoWidth,
            position: 'absolute',
            top: top,
          }}
        ></canvas>

        {isRecording && (
          <View
            position="absolute"
            top={isMobileScreen ? top + 10 : 10}
            left={10}
          >
            <RecordingIcon />
          </View>
        )}

        {isMobileScreen && (
          <View position="absolute" top={top + 10} right={10}>
            <CancelButton isMobileScreen={true} />
          </View>
        )}
      </Flex>
      {countDownRunning && (
        <Flex
          direction="column"
          alignItems="center"
          position={isMobileScreen ? 'absolute' : 'relative'}
          bottom={top + 10}
        >
          <Instruction isMobileScreen={isMobileScreen} />

          {isNotRecording && (
            <CountdownCircleTimer
              isPlaying={isNotRecording}
              size={80}
              duration={3}
              rotation="counterclockwise"
              // TODO:: using hardcoded colors for now since it requires hex value
              colors={isMobileScreen ? '#ffffff' : '#000000'}
              trailColor={'#909090'}
              onComplete={timerCompleteHandler}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          )}
        </Flex>
      )}
    </Flex>
  );
};
