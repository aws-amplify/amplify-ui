import React, { useState, useRef } from 'react';
import CountdownCircleTimer from 'react-countdown-circle-timer';
import classNames from 'classnames';

import { useTheme } from '../../../hooks';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
  useMediaStreamInVideo,
} from '../hooks';

import { CancelButton, Instruction, RecordingIcon, Overlay } from '../shared';
import { Flex, Loader, Text, View } from '../../../primitives';
import { LivenessClassNames } from '../types/classNames';

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

  const { videoRef, videoWidth, videoHeight } = useMediaStreamInVideo(
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
  const isCheckSucceeded = state.matches('checkSucceeded');

  // Android/Firefox and iOS flip the values of width/height returned from
  // getUserMedia, so we'll reset these in useLayoutEffect with the videoRef
  // element's intrinsic videoWidth and videoHeight attributes
  const [mediaWidth, setMediaWidth] = useState<number>(videoWidth);
  const [mediaHeight, setMediaHeight] = useState<number>(videoHeight);
  const [aspectRatio, setAspectRatio] = useState<number>(
    videoWidth / videoHeight
  );

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

    if (videoRef.current) {
      setMediaWidth(videoRef.current.videoWidth);
      setMediaHeight(videoRef.current.videoHeight);
      setAspectRatio(
        videoRef.current.videoWidth / videoRef.current.videoHeight
      );
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
      className={LivenessClassNames.CameraModuleCenteredLoader}
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
      className={classNames(
        LivenessClassNames.CameraModule,
        isMobileScreen && `${LivenessClassNames.CameraModule}--mobile`
      )}
    >
      {!isCameraReady && centeredLoader}

      <View
        as="canvas"
        ref={freshnessColorRef}
        className={LivenessClassNames.FreshnessCanvas}
        hidden
      />
      <div
        className={LivenessClassNames.VideoAnchor}
        style={{
          aspectRatio: `${aspectRatio}`,
        }}
      >
        <video
          ref={videoRef}
          muted
          autoPlay
          playsInline
          style={{ transform: 'scaleX(-1)' }}
          width={mediaWidth}
          height={mediaHeight}
          onCanPlay={handleMediaPlay}
          data-testid="video"
          className={LivenessClassNames.CameraModuleVideo}
        />
        <Flex
          className={classNames(
            LivenessClassNames.OvalCanvas,
            isMobileScreen && `${LivenessClassNames.OvalCanvas}--mobile`,
            isRecordingStopped && LivenessClassNames.FadeOut
          )}
        >
          <View as="canvas" width="100%" height="100%" ref={canvasRef} />
        </Flex>

        {isRecording && (
          <View
            className={LivenessClassNames.CameraModuleRecordingIconContainer}
          >
            <RecordingIcon />
          </View>
        )}

        {!isCheckSucceeded && (
          <View
            className={LivenessClassNames.CameraModuleCancelButtonContainer}
          >
            <CancelButton />
          </View>
        )}

        {countDownRunning && (
          <Overlay
            anchorOrigin={{ horizontal: 'center', vertical: 'end' }}
            className={LivenessClassNames.CameraModuleOverlayCountdown}
          >
            <Instruction />

            {isNotRecording && (
              <View
                className={
                  LivenessClassNames.CameraModuleCountdownTimerContainer
                }
                testId="liveness-camera-countdown-timer"
              >
                <CountdownCircleTimer.CountdownCircleTimer
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
                </CountdownCircleTimer.CountdownCircleTimer>
              </View>
            )}
          </Overlay>
        )}
      </div>
    </Flex>
  );
};
