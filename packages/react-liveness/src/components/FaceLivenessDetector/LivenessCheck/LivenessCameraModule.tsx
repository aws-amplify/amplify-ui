import React, { useState, useRef } from 'react';
import CountdownCircleTimer from 'react-countdown-circle-timer';
import classNames from 'classnames';

import { Flex, Loader, Text, View, useTheme } from '@aws-amplify/ui-react';
import { FaceMatchState } from '../service';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
  useMediaStreamInVideo,
  UseMediaStreamInVideo,
} from '../hooks';
import {
  ErrorDisplayText,
  HintDisplayText,
  StreamDisplayText,
} from '../displayText';

import {
  CancelButton,
  Hint,
  RecordingIcon,
  Overlay,
  MatchIndicator,
  selectErrorState,
} from '../shared';
import { LivenessClassNames } from '../types/classNames';
import {
  CheckScreenComponents,
  FaceLivenessErrorModal,
  renderErrorModal,
} from '../shared/FaceLivenessErrorModal';

export const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);
export const selectVideoStream = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoMediaStream
);
export const selectFaceMatchPercentage = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams!.faceMatchPercentage
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams!.faceMatchState
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  isRecordingStopped: boolean;
  streamDisplayText: Required<StreamDisplayText>;
  hintDisplayText: Required<HintDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
  components?: CheckScreenComponents;
  testId?: string;
}

const centeredLoader = (
  <Loader
    size="large"
    className={LivenessClassNames.Loader}
    data-testid="centered-loader"
  />
);

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const {
    isMobileScreen,
    isRecordingStopped,
    streamDisplayText,
    hintDisplayText,
    errorDisplayText,
    components: customComponents,
    testId,
  } = props;

  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  const { ErrorView = FaceLivenessErrorModal } = customComponents ?? {};

  const { tokens } = useTheme();
  const [state, send] = useLivenessActor();

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);
  const faceMatchPercentage = useLivenessSelector(selectFaceMatchPercentage);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const errorState = useLivenessSelector(selectErrorState);
  const showMatchIndicatorStates = [
    FaceMatchState.TOO_FAR,
    FaceMatchState.CANT_IDENTIFY,
    FaceMatchState.FACE_IDENTIFIED,
    FaceMatchState.MATCHED,
  ];

  const { videoRef, videoWidth, videoHeight } = useMediaStreamInVideo(
    videoStream!,
    videoConstraints!
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freshnessColorRef = useRef<HTMLCanvasElement | null>(null);

  const [countDownRunning, setCountDownRunning] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const isCheckingCamera = state.matches('cameraCheck');
  const isNotRecording = state.matches('notRecording');
  const isRecording = state.matches('recording');
  const isCheckSucceeded = state.matches('checkSucceeded');
  const isFlashingFreshness = state.matches({
    recording: 'flashFreshnessColors',
  });

  // Android/Firefox and iOS flip the values of width/height returned from
  // getUserMedia, so we'll reset these in useLayoutEffect with the videoRef
  // element's intrinsic videoWidth and videoHeight attributes
  const [mediaWidth, setMediaWidth] =
    useState<UseMediaStreamInVideo['videoWidth']>(videoWidth);
  const [mediaHeight, setMediaHeight] =
    useState<UseMediaStreamInVideo['videoHeight']>(videoHeight);
  const [aspectRatio, setAspectRatio] = useState<number>(() =>
    videoWidth && videoHeight ? videoWidth / videoHeight : 0
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
      data-testid={testId}
    >
      {!isCameraReady && centeredLoader}

      <View
        as="canvas"
        ref={freshnessColorRef}
        className={LivenessClassNames.FreshnessCanvas}
        hidden
      />
      <View
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
          className={LivenessClassNames.Video}
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
          <View className={LivenessClassNames.RecordingIconContainer}>
            <RecordingIcon>{recordingIndicatorText}</RecordingIcon>
          </View>
        )}

        {!isCheckSucceeded && (
          <View className={LivenessClassNames.CancelContainer}>
            <CancelButton ariaLabel={cancelLivenessCheckText}></CancelButton>
          </View>
        )}

        {countDownRunning && (
          <Overlay
            anchorOrigin={{
              horizontal: 'center',
              vertical:
                isRecording && !isFlashingFreshness ? 'start' : 'space-between',
            }}
            className={LivenessClassNames.InstructionOverlay}
          >
            <Hint hintDisplayText={hintDisplayText} />

            {errorState && (
              <ErrorView
                onRetry={() => {
                  send({ type: 'CANCEL' });
                }}
              >
                {renderErrorModal({
                  errorState,
                  overrideErrorDisplayText: errorDisplayText,
                })}
              </ErrorView>
            )}

            {/* 
              We only want to show the MatchIndicator when we're recording
              and when the face is in either the too far state, or the 
              initial face identified state
            */}
            {isRecording &&
            !isFlashingFreshness &&
            showMatchIndicatorStates.includes(faceMatchState!) ? (
              <MatchIndicator percentage={faceMatchPercentage!} />
            ) : null}

            {isNotRecording && (
              <View
                className={LivenessClassNames.CountdownContainer}
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
      </View>
    </Flex>
  );
};
