import React, { useState, useRef } from 'react';
import { classNames } from '@aws-amplify/ui';

import {
  Button,
  Flex,
  Label,
  Loader,
  SelectField,
  Text,
  View,
} from '@aws-amplify/ui-react';
import { useColorMode } from '@aws-amplify/ui-react/internal';
import { FaceMatchState, drawStaticOval } from '../service';
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
  CameraDisplayText,
} from '../displayText';

import { Hint, Overlay, selectErrorState, MatchIndicator } from '../shared';
import { LivenessClassNames } from '../types/classNames';
import {
  FaceLivenessErrorModal,
  renderErrorModal,
} from '../shared/FaceLivenessErrorModal';
import {
  DefaultPhotosensitiveWarning,
  FaceLivenessDetectorComponents,
  DefaultCancelButton,
  DefaultRecordingIcon,
} from '../shared/DefaultStartScreenComponents';

export const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);
export const selectVideoStream = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoMediaStream
);
export const selectFaceMatchPercentage = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams?.faceMatchPercentage
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams?.faceMatchState
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
  cameraDisplayText: Required<CameraDisplayText>;
  components?: FaceLivenessDetectorComponents;
  testId?: string;
}

const centeredLoader = (
  <Loader
    size="large"
    className={LivenessClassNames.Loader}
    data-testid="centered-loader"
  />
);

const showMatchIndicatorStates = [
  FaceMatchState.TOO_FAR,
  FaceMatchState.CANT_IDENTIFY,
  FaceMatchState.FACE_IDENTIFIED,
];

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
    cameraDisplayText,
    components: customComponents,
    testId,
  } = props;

  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  const {
    ErrorView = FaceLivenessErrorModal,
    PhotosensitiveWarning = DefaultPhotosensitiveWarning,
  } = customComponents ?? {};

  const [state, send] = useLivenessActor();

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);
  const selectedDeviceId = useLivenessSelector(selectSelectedDeviceId);
  const selectableDevices = useLivenessSelector(selectSelectableDevices);

  const faceMatchPercentage = useLivenessSelector(selectFaceMatchPercentage);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const errorState = useLivenessSelector(selectErrorState);

  const colorMode = useColorMode();

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

  React.useEffect(() => {
    if (
      canvasRef &&
      videoRef &&
      canvasRef.current &&
      videoRef.current &&
      videoStream &&
      isStartView
    ) {
      drawStaticOval(canvasRef.current, videoRef.current, videoStream);
    }
  }, [canvasRef, videoRef, videoStream, colorMode, isStartView]);

  React.useEffect(() => {
    const updateColorModeHandler = (e: MediaQueryListEvent) => {
      if (
        e.matches &&
        canvasRef &&
        videoRef &&
        canvasRef.current &&
        videoRef.current &&
        videoStream &&
        isStartView
      ) {
        drawStaticOval(canvasRef.current, videoRef.current, videoStream);
      }
    };

    const darkModePreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const lightModePreference = window.matchMedia(
      '(prefers-color-scheme: light)'
    );

    darkModePreference.addEventListener('change', updateColorModeHandler);
    lightModePreference.addEventListener('change', updateColorModeHandler);

    return () => {
      darkModePreference.removeEventListener('change', updateColorModeHandler);
      lightModePreference.addEventListener('change', updateColorModeHandler);
    };
  }, [canvasRef, videoRef, videoStream, isStartView]);

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

  const photoSensitivityWarning = React.useMemo(() => {
    return (
      <View style={{ visibility: isStartView ? 'visible' : 'hidden' }}>
        <PhotosensitiveWarning
          bodyText={instructionDisplayText.photosensitivityWarningBodyText}
          headingText={
            instructionDisplayText.photosensitivityWarningHeadingText
          }
          infoText={instructionDisplayText.photosensitivityWarningInfoText}
          labelText={instructionDisplayText.photosensitivityWarningLabelText}
        />
      </View>
    );
  }, [PhotosensitiveWarning, instructionDisplayText, isStartView]);

  const handleMediaPlay = () => {
    setIsCameraReady(true);
  };

  const beginLivenessCheck = React.useCallback(() => {
    send({
      type: 'BEGIN',
    });
  }, [send]);

  const onCameraChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDeviceId = e.target.value;
      const changeCamera = async () => {
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
      };
      changeCamera();
    },
    [videoConstraints, send]
  );

  if (isCheckingCamera) {
    return (
      <Flex
        justifyContent={'center'}
        className={LivenessClassNames.StartScreenCameraWaiting}
      >
        <Loader
          size="large"
          className={LivenessClassNames.Loader}
          data-testid="centered-loader"
          position="unset"
        />
        <Text
          fontSize="large"
          fontWeight="bold"
          data-testid="waiting-camera-permission"
          className={`${LivenessClassNames.StartScreenCameraWaiting}__text`}
        >
          {cameraDisplayText.waitingCameraPermissionText}
        </Text>
      </Flex>
    );
  }

  const isRecordingOnMobile =
    isMobileScreen && !isStartView && !isWaitingForCamera && isRecording;

  return (
    <>
      {photoSensitivityWarning}

      <Flex
        className={classNames(
          LivenessClassNames.CameraModule,
          isRecordingOnMobile && `${LivenessClassNames.CameraModule}--mobile`
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
            width={mediaWidth}
            height={mediaHeight}
            onCanPlay={handleMediaPlay}
            data-testid="video"
            className={LivenessClassNames.Video}
            aria-label={cameraDisplayText.a11yVideoLabelText}
          />
          <Flex
            className={classNames(
              LivenessClassNames.OvalCanvas,
              isRecordingOnMobile && `${LivenessClassNames.OvalCanvas}--mobile`,
              isRecordingStopped && LivenessClassNames.FadeOut
            )}
          >
            <View as="canvas" ref={canvasRef} />
          </Flex>

          {isRecording && (
            <DefaultRecordingIcon
              recordingIndicatorText={recordingIndicatorText}
            />
          )}

          {!isStartView && !isWaitingForCamera && !isCheckSucceeded && (
            <DefaultCancelButton
              cancelLivenessCheckText={cancelLivenessCheckText}
            />
          )}

          <Overlay
            horizontal="center"
            vertical={
              isRecording && !isFlashingFreshness ? 'start' : 'space-between'
            }
            className={LivenessClassNames.InstructionOverlay}
          >
            <Hint hintDisplayText={hintDisplayText} />

            {errorState && (
              <ErrorView
                onRetry={() => {
                  send({ type: 'CANCEL' });
                }}
                displayText={errorDisplayText}
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

          {isStartView &&
            !isMobileScreen &&
            selectableDevices &&
            selectableDevices.length > 1 && (
              <Flex className={LivenessClassNames.StartScreenCameraSelect}>
                <View
                  className={
                    LivenessClassNames.StartScreenCameraSelectContainer
                  }
                >
                  <Label
                    htmlFor="amplify-liveness-camera-select"
                    className={`${LivenessClassNames.StartScreenCameraSelect}__label`}
                  >
                    Camera:
                  </Label>
                  <SelectField
                    id="amplify-liveness-camera-select"
                    label="Camera"
                    labelHidden
                    value={selectedDeviceId}
                    onChange={onCameraChange}
                  >
                    {selectableDevices?.map((device) => (
                      <option value={device.deviceId} key={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </SelectField>
                </View>
              </Flex>
            )}
        </View>
      </Flex>

      {isStartView && (
        <Flex justifyContent="center">
          <Button
            variation="primary"
            type="button"
            onClick={beginLivenessCheck}
          >
            {instructionDisplayText.startScreenBeginCheckText}
          </Button>
        </Flex>
      )}
    </>
  );
};
