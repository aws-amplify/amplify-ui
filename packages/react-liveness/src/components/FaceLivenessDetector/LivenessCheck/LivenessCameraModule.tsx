import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import {
  Button,
  Flex,
  Label,
  Loader,
  SelectField,
  View,
} from '@aws-amplify/ui-react';
import { FaceMatchState } from '../service';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
  useMediaStreamInVideo,
  UseMediaStreamInVideo,
} from '../hooks';
import {
  InstructionDisplayText,
  ErrorDisplayText,
  HintDisplayText,
  StreamDisplayText,
} from '../displayText';

import {
  CancelButton,
  Hint,
  RecordingIcon,
  Overlay,
  selectErrorState,
  MatchIndicator,
} from '../shared';
import { LivenessClassNames } from '../types/classNames';
import {
  CheckScreenComponents,
  FaceLivenessErrorModal,
  renderErrorModal,
} from '../shared/FaceLivenessErrorModal';
import { DefaultPhotosensitiveWarning } from '../shared/DefaultStartScreenComponents';

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
export const selectSelectedDeviceId = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.selectedDeviceId
);
export const selectSelectableDevices = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.selectableDevices
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  isRecordingStopped: boolean;
  instructionDisplayText: Required<InstructionDisplayText>;
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

/**
 * For now we want to memoize the HOC for MatchIndicator because to optimize renders
 * The LivenessCameraModule still needs to be optimized for re-renders and at that time
 * we should be able to remove this memoization
 */
const MemoizedMatchIndicator = React.memo(MatchIndicator);

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): JSX.Element => {
  const {
    isMobileScreen,
    isRecordingStopped,
    instructionDisplayText,
    streamDisplayText,
    hintDisplayText,
    errorDisplayText,
    components: customComponents,
    testId,
  } = props;

  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  const { ErrorView = FaceLivenessErrorModal } = customComponents ?? {};

  const [state, send] = useLivenessActor();

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);
  const selectedDeviceId = useLivenessSelector(selectSelectedDeviceId);
  const selectableDevices = useLivenessSelector(selectSelectableDevices);

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
    videoStream!
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freshnessColorRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const isCheckingCamera = state.matches('cameraCheck');
  const isWaitingForCamera = state.matches('waitForDOMAndCameraDetails');
  const isStartView = state.matches('start') || state.matches('userCancel');
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

  const handleMediaPlay = () => {
    setIsCameraReady(true);
  };

  const beginLivenessCheck = React.useCallback(() => {
    send({
      type: 'BEGIN',
    });
  }, [send]);

  const onCameraChange = React.useCallback(
    async (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const newDeviceId = e.target.value as string;
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          ...videoConstraints,
          deviceId: { exact: newDeviceId },
        },
        audio: false,
      });
      send({
        type: 'UPDATE_DEVICE_AND_STREAM',
        data: { newDeviceId, newStream },
      });
    },
    [videoConstraints, send]
  );

  if (isCheckingCamera) {
    return (
      <Flex height={videoHeight} width="100%" position="relative">
        {centeredLoader}
      </Flex>
    );
  }

  return (
    <>
      {isStartView && (
        <DefaultPhotosensitiveWarning
          bodyText={instructionDisplayText.photosensitivyWarningBodyText}
          infoText={instructionDisplayText.photosensitivyWarningInfoText}
        />
      )}

      <Flex
        className={classNames(
          LivenessClassNames.CameraModule,
          isMobileScreen &&
            !isStartView &&
            !isWaitingForCamera &&
            isRecording &&
            `${LivenessClassNames.CameraModule}--mobile`
        )}
        data-testid={testId}
        gap="zero"
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
              isMobileScreen &&
                !isStartView &&
                !isWaitingForCamera &&
                isRecording &&
                `${LivenessClassNames.OvalCanvas}--mobile`,
              isRecordingStopped && LivenessClassNames.FadeOut
            )}
          >
            <View as="canvas" ref={canvasRef} />
          </Flex>

          {isRecording && (
            <View className={LivenessClassNames.RecordingIconContainer}>
              <RecordingIcon>{recordingIndicatorText}</RecordingIcon>
            </View>
          )}

          {!isStartView && !isWaitingForCamera && !isCheckSucceeded && (
            <View className={LivenessClassNames.CancelContainer}>
              <CancelButton ariaLabel={cancelLivenessCheckText}></CancelButton>
            </View>
          )}

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
              initial face identified state. Using the a memoized MatchIndicator here
              so that even when this component re-renders the indicator is only
              re-rendered if the percentage prop changes.
            */}
            {isRecording &&
            !isFlashingFreshness &&
            showMatchIndicatorStates.includes(faceMatchState!) ? (
              <MemoizedMatchIndicator
                percentage={Math.ceil(faceMatchPercentage!)}
              />
            ) : null}
          </Overlay>
        </View>

        {isStartView && (
          <Flex
            width="100%"
            padding="small"
            backgroundColor="var(--amplify-colors-background-primary)"
            direction="column"
          >
            {!isMobileScreen && (
              <Flex alignItems="center" justifyContent="center">
                <Label htmlFor="amplify-liveness-camera-select">Camera:</Label>
                <SelectField
                  id="amplify-liveness-camera-select"
                  label="Camera"
                  labelHidden
                  value={selectedDeviceId}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onChange={onCameraChange}
                >
                  {selectableDevices?.map((device) => (
                    <option value={device.deviceId} key={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </SelectField>
              </Flex>
            )}

            <Flex justifyContent="center">
              <Button
                variation="primary"
                type="button"
                onClick={beginLivenessCheck}
              >
                {instructionDisplayText.instructionsBeginCheckText}
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};
