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
  selectDisableStartScreen,
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
import { CancelButton } from '../../shared/CancelButton';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');
jest.mock('../../shared/CancelButton');
jest.mock('../../shared/Hint');
jest.mock('../../service');

const drawStaticOvalSpy = jest.spyOn(ServiceModule, 'drawStaticOval');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

// returns `value` for every selector except `disableStartScreen`, which keeps
// the start screen enabled
const mockSelectorsReturnValue = (value: unknown) =>
  mockUseLivenessSelector.mockImplementation((selector) =>
    selector === selectDisableStartScreen ? undefined : value
  );
const mockUseMediaStreamInVideo = getMockedFunction(useMediaStreamInVideo);

// Mock navigator.mediaDevices.getUserMedia
const mockGetUserMedia = jest.fn();
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
  writable: true,
});

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

  const mockMediaStream = {
    getTracks: jest.fn(() => []),
    getVideoTracks: jest.fn(() => []),
  };

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
      .calledWith('userCancel')
      .mockReturnValue(false)
      .calledWith('waitForDOMAndCameraDetails')
      .mockReturnValue(false)
      .calledWith('detectFaceBeforeStart')
      .mockReturnValue(false)
      .calledWith('recording')
      .mockReturnValue(isRecording)
      .calledWith('checkSucceeded')
      .mockReturnValue(false)
      .calledWith({ recording: 'flashFreshnessColors' })
      .mockReturnValue(false);
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
    mockGetUserMedia.mockResolvedValue(mockMediaStream);
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
    mockSelectorsReturnValue('FaceMovementAndLightChallenge');
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

  it('should not render photosensitivity warning when the start screen is disabled', async () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector.mockImplementation((selector) =>
      selector === selectDisableStartScreen
        ? true
        : 'FaceMovementAndLightChallenge'
    );
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

    expect(
      screen.queryByText(
        instructionDisplayText.photosensitivityWarningHeadingText
      )
    ).not.toBeInTheDocument();
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

  it('should render the cancel button while recording', async () => {
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

    expect(
      screen.getByRole('button', { name: cancelLivenessCheckText })
    ).toBeInTheDocument();
    expect(CancelButton).toHaveBeenCalledWith(
      { ariaLabel: cancelLivenessCheckText, Component: undefined },
      expect.anything()
    );
  });

  it('should pass a custom CancelButton component to the cancel button', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    const CustomCancelButton = () => <button>Leave check</button>;
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
          components={{ CancelButton: CustomCancelButton }}
        />
      );
    });

    expect(CancelButton).toHaveBeenCalledWith(
      { ariaLabel: cancelLivenessCheckText, Component: CustomCancelButton },
      expect.anything()
    );
  });

  it('should not render the cancel button when components.CancelButton is null', async () => {
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
          components={{ CancelButton: null }}
        />
      );
    });

    expect(
      screen.queryByRole('button', { name: cancelLivenessCheckText })
    ).not.toBeInTheDocument();
    expect(CancelButton).not.toHaveBeenCalled();
    expect(
      document.querySelector(`.${LivenessClassNames.CancelContainer}`)
    ).not.toBeInTheDocument();
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
    mockSelectorsReturnValue(['device-id', 'device-id-2', 'device-id-3']);

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
    mockSelectorsReturnValue(['device-id']);
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

  describe('when the video area resizes', () => {
    let resizeObservers: {
      callback: ResizeObserverCallback;
      observe: jest.Mock;
      disconnect: jest.Mock;
    }[] = [];
    const originalResizeObserver = window.ResizeObserver;

    const triggerResize = () =>
      resizeObservers.forEach(({ callback }) =>
        callback([], {} as ResizeObserver)
      );

    const renderCameraModule = () =>
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

    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;
    let frameCallbacks: FrameRequestCallback[] = [];
    const flushFrames = () => {
      const callbacks = frameCallbacks;
      frameCallbacks = [];
      callbacks.forEach((callback) => callback(0));
    };

    beforeEach(() => {
      frameCallbacks = [];
      window.requestAnimationFrame = (callback) =>
        frameCallbacks.push(callback);
      window.cancelAnimationFrame = jest.fn();
      resizeObservers = [];
      window.ResizeObserver = jest.fn((callback: ResizeObserverCallback) => {
        const observer = {
          callback,
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
        resizeObservers.push(observer);
        return observer;
      }) as unknown as typeof ResizeObserver;
    });

    afterEach(() => {
      window.ResizeObserver = originalResizeObserver;
      window.requestAnimationFrame = originalRequestAnimationFrame;
      window.cancelAnimationFrame = originalCancelAnimationFrame;
      jest.useRealTimers();
    });

    const setAnchorSize = (width: number, height: number) => {
      const anchor = document.querySelector(
        `.${LivenessClassNames.VideoAnchor}`
      )!;
      Object.defineProperty(anchor, 'clientWidth', {
        value: width,
        configurable: true,
      });
      Object.defineProperty(anchor, 'clientHeight', {
        value: height,
        configurable: true,
      });
    };

    it('should redraw the static oval on the start screen', async () => {
      isStart = true;
      mockStateMatchesAndSelectors();
      mockUseLivenessSelector.mockReturnValue(25);
      await waitFor(() => {
        renderCameraModule();
      });

      const videoEl = screen.getByTestId('video');
      await waitFor(() => {
        videoEl.dispatchEvent(new Event('loadedmetadata'));
      });
      expect(drawStaticOvalSpy).toHaveBeenCalledTimes(1);

      setAnchorSize(640, 480);
      triggerResize();
      expect(drawStaticOvalSpy).toHaveBeenCalledTimes(1);
      flushFrames();

      expect(drawStaticOvalSpy).toHaveBeenCalledTimes(2);
      expect(mockActorSend).not.toHaveBeenCalledWith({ type: 'VIDEO_RESIZED' });
    });

    it('should skip notifications when the size has not changed', async () => {
      isStart = true;
      mockStateMatchesAndSelectors();
      mockUseLivenessSelector.mockReturnValue(25);
      await waitFor(() => {
        renderCameraModule();
      });
      const videoEl = screen.getByTestId('video');
      await waitFor(() => {
        videoEl.dispatchEvent(new Event('loadedmetadata'));
      });
      drawStaticOvalSpy.mockClear();

      setAnchorSize(640, 480);
      triggerResize();
      triggerResize();
      flushFrames();
      expect(drawStaticOvalSpy).toHaveBeenCalledTimes(1);

      // two changes within one frame are coalesced into one redraw
      setAnchorSize(700, 500);
      triggerResize();
      setAnchorSize(800, 600);
      triggerResize();
      flushFrames();
      expect(drawStaticOvalSpy).toHaveBeenCalledTimes(2);
    });

    it('should send VIDEO_RESIZED during recording', async () => {
      isRecording = true;
      mockStateMatchesAndSelectors();
      await waitFor(() => {
        renderCameraModule();
      });

      jest.useFakeTimers({
        doNotFake: ['requestAnimationFrame', 'cancelAnimationFrame'],
      });
      // several frames of a resize animation
      [600, 620, 640].forEach((width) => {
        setAnchorSize(width, 480);
        triggerResize();
        flushFrames();
      });
      expect(mockActorSend).not.toHaveBeenCalledWith({ type: 'VIDEO_RESIZED' });

      jest.advanceTimersByTime(100);

      // sent once the size settles, not once per frame
      expect(
        mockActorSend.mock.calls.filter(
          ([event]) => event.type === 'VIDEO_RESIZED'
        )
      ).toHaveLength(1);
      expect(drawStaticOvalSpy).not.toHaveBeenCalled();
    });

    it('should lay the video out from the settled box after a rotation', async () => {
      // the real math, so the assertion is about geometry rather than a stub
      const fillLayoutSpy = jest
        .spyOn(ServiceModule, 'getVideoFillLayout')
        .mockImplementation(
          jest.requireActual('../../service/utils/liveness').getVideoFillLayout
        );
      isStart = true;
      mockStateMatchesAndSelectors();
      mockUseLivenessSelector.mockReturnValue(25);
      await waitFor(() => {
        renderCameraModule();
      });

      const videoEl = screen.getByTestId('video') as HTMLVideoElement;
      Object.defineProperty(videoEl, 'videoWidth', {
        value: 640,
        configurable: true,
      });
      Object.defineProperty(videoEl, 'videoHeight', {
        value: 480,
        configurable: true,
      });

      // portrait box first: width-bound, so the frame is scaled to keep 70% of
      // its width visible (412 / (640 * 0.7)) and cropped on the sides
      setAnchorSize(412, 915);
      await waitFor(() => {
        videoEl.dispatchEvent(new Event('loadedmetadata'));
      });
      expect(parseFloat(videoEl.style.height)).toBeCloseTo((480 * 412) / 448);

      // iOS Safari reports a stale box immediately after the rotation, then
      // settles; every change schedules one frame, so the last one wins
      setAnchorSize(412, 915);
      triggerResize();
      setAnchorSize(915, 412);
      triggerResize();
      flushFrames();

      // landscape box: height-bound, so the frame fills the 412px height and
      // is pillarboxed rather than cropped
      expect(fillLayoutSpy).toHaveBeenLastCalledWith({
        containerWidth: 915,
        containerHeight: 412,
        videoWidth: 640,
        videoHeight: 480,
      });
      expect(parseFloat(videoEl.style.height)).toBeCloseTo(412);
      expect(parseFloat(videoEl.style.width)).toBeCloseTo((640 * 412) / 480);

      // captured once at loadedmetadata from the intrinsic frame, not the
      // flipped track dims the hook reports, and unchanged by the rotation
      expect(videoEl.getAttribute('width')).toBe('640');
      expect(videoEl.getAttribute('height')).toBe('480');

      fillLayoutSpy.mockRestore();
    });

    it('should observe the video anchor and disconnect on unmount', async () => {
      isRecording = true;
      mockStateMatchesAndSelectors();
      let unmount = () => {};
      await waitFor(() => {
        ({ unmount } = renderCameraModule());
      });

      const observer = resizeObservers[resizeObservers.length - 1];
      expect(observer.observe).toHaveBeenCalledWith(
        document.querySelector(`.${LivenessClassNames.VideoAnchor}`)
      );

      // a redraw is pending when the component unmounts
      setAnchorSize(640, 480);
      triggerResize();

      unmount();

      expect(observer.disconnect).toHaveBeenCalled();
      expect(window.cancelAnimationFrame).toHaveBeenCalled();
    });
  });
});
