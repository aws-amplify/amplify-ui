import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useActor } from '@xstate/react';
import { I18n } from 'aws-amplify';
import { useTheme } from '../../../hooks';
import { useLivenessFlow } from '../providers';
import { Instruction } from '../shared/Instruction';
import { Flex } from '../../..';

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  videoConstraints: MediaTrackConstraints;
}

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const { isMobileScreen, videoConstraints } = props;

  const { tokens } = useTheme();
  const { service } = useLivenessFlow();
  const [state, send] = useActor(service);
  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const height = (videoConstraints.height as ConstrainULongRange).ideal;
  const width = (videoConstraints.width as ConstrainULongRange).ideal;
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoHeight, setVideoHeight] = useState<number>(height);
  const [videoWidth, setVideoWidth] = useState<number>(width);
  const [top, setTop] = useState<number>(0);
  const isNotRecording = state.matches('notRecording');

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
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Flex direction="column" style={{ position: 'relative' }}>
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
      </Flex>
      {countDownRunning && (
        <Flex
          direction="column"
          alignItems="center"
          style={{
            position: `${isMobileScreen ? 'absolute' : 'static'}`,
            bottom: top + 10,
          }}
        >
          <Instruction
            instruction={
              isNotRecording
                ? I18n.get(
                    'Once recording begins, move your face inside the frame that appears'
                  )
                : state.context.faceMatchState
            }
          />
          {isNotRecording && (
            <CountdownCircleTimer
              isPlaying={isNotRecording}
              size={60}
              duration={3}
              rotation="counterclockwise"
              colors={`${tokens.colors.black.value}`}
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
