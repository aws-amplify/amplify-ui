import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { when, resetAllWhenMocks } from 'jest-when';
import { LivenessClassNames } from '../../types/classNames';

import {
  renderWithLivenessProvider,
  getMockedFunction,
  mockMatchMedia,
} from '../../__mocks__/utils';
import {
  useLivenessActor,
  useLivenessSelector,
  useMediaStreamInVideo,
} from '../../hooks';
import {
  LivenessCameraModule,
  selectFaceMatchPercentage,
  selectFaceMatchState,
  selectSelectableDevices,
  selectSelectedDeviceId,
  selectVideoConstraints,
  selectVideoStream,
} from '../LivenessCameraModule';

import * as ServiceModule from '../../service';
import { FaceMatchState } from '../../service';
import * as Device from '../../utils/device';
import { getDisplayText } from '../../utils/getDisplayText';
import { selectIsRecordingStopped } from '../LivenessCheck';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');
jest.mock('../../shared/CancelButton');
jest.mock('../../shared/Hint');
jest.mock('../../service');

const drawStaticOvalSpy = jest.spyOn(ServiceModule, 'drawStaticOval');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);
const mockUseMediaStreamInVideo = getMockedFunction(useMediaStreamInVideo);

const mockDevices = [
  {
    deviceId: '123',
    kind: 'videoinput',
    label: 'Front Camera',
    groupId: '',
  },
  {
    deviceId: '456',
    kind: 'videoinput',
    label: 'Back Camera',
    groupId: '',
  },
];
const mockEnumerateDevices = jest.fn().mockResolvedValue(mockDevices);

describe('LivenessCameraModule', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  let isCheckingCamera = false;
  let isNotRecording = false;
  let isRecording = false;
  let isStart = false;
  let isInitCamera = false;
  let isInitWebsocket = false;
  let isWaitingForCamera = false;

  const {
    hintDisplayText,
    streamDisplayText,
    errorDisplayText,
    cameraDisplayText,
    instructionDisplayText,
  } = getDisplayText(undefined);
  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  function mockStateMatchesAndSelectors() {
    when(mockActorState.matches)
      .calledWith('initCamera')
      .mockReturnValue(isInitCamera)
      .calledWith('initWebsocket')
      .mockReturnValue(isInitWebsocket)
      .calledWith({ initCamera: 'cameraCheck' })
      .mockReturnValue(isCheckingCamera)
      .calledWith({
        initCamera: 'waitForDOMAndCameraDetails',
      })
      .mockReturnValue(isWaitingForCamera)
      .calledWith('notRecording')
      .mockReturnValue(isNotRecording)
      .calledWith('start')
      .mockReturnValue(isStart)
      .calledWith('recording')
      .mockReturnValue(isRecording);
  }

  beforeEach(() => {
    mockMatchMedia();
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
    mockUseLivenessSelector.mockReturnValueOnce({}).mockReturnValueOnce({});
    mockUseMediaStreamInVideo.mockReturnValue({
      videoRef: { current: document.createElement('video') },
      videoHeight: 100,
      videoWidth: 100,
    });
    drawStaticOvalSpy.mockClear();
    (global.navigator.mediaDevices as any) = {
      getUserMedia: jest.fn(),
      enumerateDevices: mockEnumerateDevices,
    };
  });

  afterEach(() => {
    isCheckingCamera = false;
    isNotRecording = false;
    isRecording = false;
    isStart = false;

    jest.clearAllMocks();
    jest.clearAllTimers();
    resetAllWhenMocks();
  });

  it('should render centered loader when isInitCamera true', async () => {
    isInitCamera = true;
    mockStateMatchesAndSelectors();

    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
  });

  it('should render centered loader when isInitWebsocket true', async () => {
    isInitWebsocket = true;
    mockStateMatchesAndSelectors();

    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
  });

  it('should apply correct classNames to user-facing video', async () => {
    isStart = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockImplementation((selector) => {
      if (selector === selectSelectableDevices) {
        return mockDevices;
      }
      if (selector === selectSelectedDeviceId) {
        return 123;
      }
      return undefined;
    });
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    const cameraSelector = screen.getByRole('combobox') as HTMLSelectElement;
    const videoEl = screen.getByTestId('video');

    await waitFor(() => {
      expect(cameraSelector).toBeInTheDocument();
      expect(cameraSelector.value).toBe('123');
      expect(videoEl).toHaveClass(LivenessClassNames.Video);
      expect(videoEl).toHaveClass(LivenessClassNames.UserFacingVideo);
    });
  });

  it('should apply correct classNames to video', async () => {
    isStart = true;
    jest.spyOn(Device, 'isDeviceUserFacing').mockResolvedValue(false);
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockImplementation((selector) => {
      if (selector === selectSelectableDevices) {
        return mockDevices;
      }
      if (selector === selectSelectedDeviceId) {
        return 456;
      }
      return undefined;
    });

    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    const cameraSelector = screen.getByRole('combobox') as HTMLSelectElement;
    const videoEl = screen.getByTestId('video');

    await waitFor(() => {
      expect(cameraSelector).toBeInTheDocument();
      expect(cameraSelector.value).toBe('456');
      expect(videoEl).toHaveClass(LivenessClassNames.Video);
      expect(videoEl).not.toHaveClass(LivenessClassNames.UserFacingVideo);
    });
  });

  it.skip('should render video and timer when isNotRecording true', async () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={true}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });
    const videoEl = screen.getByTestId('video');

    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
    expect(videoEl).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: cancelLivenessCheckText })
    ).toBeInTheDocument();

    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    expect(screen.queryByTestId('centered-loader')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Countdown timer')).toBeInTheDocument();
    expect(screen.getByText('Hint')).toBeInTheDocument();

    await waitFor(() => expect(mockActorSend).toHaveBeenCalledTimes(1), {
      timeout: 5000,
    });
    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'SET_DOM_AND_CAMERA_DETAILS',
      data: {
        videoEl: expect.any(HTMLVideoElement),
        freshnessColorEl: expect.any(HTMLCanvasElement),
        canvasEl: expect.any(HTMLCanvasElement),
        isMobile: true,
      },
    });
  });

  it('should render recording icon when isRecording true', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    expect(screen.getByTestId('rec-icon')).toBeInTheDocument();
    expect(screen.getByText(recordingIndicatorText)).toBeInTheDocument();
  });

  it('should render MatchIndicator when isRecording and faceMatchState is TOO_FAR', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.TOO_FAR);

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(1);
  });

  it('should render MatchIndicator when isRecording and faceMatchState is CANT_IDENTIFY', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.CANT_IDENTIFY);

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(1);
  });

  it('should render MatchIndicator when isRecording and faceMatchState is FACE_IDENTIFIED', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.FACE_IDENTIFIED);

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(1);
  });

  it('should render MatchIndicator when isRecording and faceMatchState is MATCHED', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.MATCHED);

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(0);
  });

  it('should not render MatchIndicator when isRecording and faceMatchState is TOO_MANY', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.TOO_MANY);

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });
    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(0);
  });

  it('should render photosensitivity warning when challenge is FaceMovementAndLightChallenge and isNotRecording is true', async () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockReturnValue('FaceMovementAndLightChallenge');
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    const photosensitivityWarning = screen.queryByText(
      instructionDisplayText.photosensitivityWarningHeadingText
    );
    expect(photosensitivityWarning).toBeInTheDocument();
  });

  it('should not render photosensitivity warning when challenge is FaceMovementChallenge and isNotRecording is true', async () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockReset();
    mockUseLivenessSelector.mockReturnValue('FaceMovementChallenge');
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    const photosensitivityWarning = screen.queryByText(
      instructionDisplayText.photosensitivityWarningHeadingText
    );
    expect(photosensitivityWarning).not.toBeInTheDocument();
  });

  it('should create appropriate selectors', () => {
    const expectedConstraints = { width: 100 };
    const expectedStream = { getTracks: () => [] };

    const state: any = {
      context: {
        videoAssociatedParams: {
          videoConstraints: expectedConstraints,
          videoMediaStream: expectedStream,
          selectedDeviceId: 'foobar',
          selectableDevices: ['foobar'],
        },
        faceMatchAssociatedParams: {
          faceMatchPercentage: 100,
          faceMatchState: FaceMatchState.MATCHED,
        },
      },
    };

    const actualConstraints = selectVideoConstraints(state);
    const actualStream = selectVideoStream(state);
    const actualPercentage = selectFaceMatchPercentage(state);
    const actualDeviceId = selectSelectedDeviceId(state);
    const actualSelectableDevices = selectSelectableDevices(state);
    const actualFaceMatchState = selectFaceMatchState(state);

    expect(actualConstraints).toEqual(expectedConstraints);
    expect(actualStream).toEqual(expectedStream);
    expect(actualPercentage).toEqual(100);
    expect(actualDeviceId).toEqual('foobar');
    expect(actualSelectableDevices).toEqual(['foobar']);
    expect(actualFaceMatchState).toEqual(FaceMatchState.MATCHED);
  });

  it('selectors should work with undefined values', () => {
    const state: any = {
      context: {},
    };

    const actualConstraints = selectVideoConstraints(state);
    const actualStream = selectVideoStream(state);
    const actualPercentage = selectFaceMatchPercentage(state);
    const actualDeviceId = selectSelectedDeviceId(state);
    const actualSelectableDevices = selectSelectableDevices(state);
    const actualFaceMatchState = selectFaceMatchState(state);

    expect(actualConstraints).toEqual(undefined);
    expect(actualStream).toEqual(undefined);
    expect(actualPercentage).toEqual(undefined);
    expect(actualDeviceId).toEqual(undefined);
    expect(actualSelectableDevices).toEqual(undefined);
    expect(actualFaceMatchState).toEqual(undefined);
  });

  it('should render with custom components', async () => {
    isCheckingCamera = true;
    mockStateMatchesAndSelectors();
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          components={{ ErrorView: undefined }}
        />
      );
    });
    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
  });

  it('should render hair check screen when isStart = true', async () => {
    isStart = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(['device-id', 'device-id-2', 'device-id-3']);

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        cameraDisplayText={cameraDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    expect(screen.getByTestId('popover-icon')).toBeInTheDocument();
    expect(
      screen.getByTestId('amplify-liveness-camera-select')
    ).toBeInTheDocument();
  });

  it('should render hair check screen when isStart = true, should not render camera selector if only one camera', async () => {
    isStart = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockReturnValue(25).mockReturnValue(['device-id']);
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });
    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });

    expect(screen.getByTestId('popover-icon')).toBeInTheDocument();
    expect(
      screen.queryByTestId('amplify-liveness-camera-select')
    ).not.toBeInTheDocument();
  });

  it('selectors should work', () => {
    mockUseLivenessSelector.mockReturnValueOnce({}).mockReturnValueOnce({});
    const state: any = {
      context: {
        isRecordingStopped: true,
      },
    };

    const isRecordingStopped = selectIsRecordingStopped(state);

    expect(isRecordingStopped).toEqual(true);
  });

  it('should show a full screen camera', async () => {
    isInitCamera = false;
    isInitWebsocket = false;
    isWaitingForCamera = false;
    mockStateMatchesAndSelectors();

    const testId = 'cameraModule';
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={true}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
          testId={testId}
        />
      );
    });

    const cameraModule = await screen.findByTestId(testId);

    expect(cameraModule.className).toContain(
      `${LivenessClassNames.CameraModule}--mobile`
    );
  });

  it('should trigger drawStaticOval once video metadata is loaded', async () => {
    isStart = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockReturnValue(25);
    await waitFor(() => {
      renderWithLivenessProvider(
        <LivenessCameraModule
          isMobileScreen={false}
          isRecordingStopped={false}
          hintDisplayText={hintDisplayText}
          streamDisplayText={streamDisplayText}
          errorDisplayText={errorDisplayText}
          cameraDisplayText={cameraDisplayText}
          instructionDisplayText={instructionDisplayText}
        />
      );
    });

    const videoEl = screen.getByTestId('video');
    await waitFor(() => {
      videoEl.dispatchEvent(new Event('canplay'));
    });
    expect(drawStaticOvalSpy).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      videoEl.dispatchEvent(new Event('loadedmetadata'));
    });
    expect(drawStaticOvalSpy).toHaveBeenCalledTimes(1);
  });
});
