import * as React from 'react';
import { screen, waitFor, fireEvent, act } from '@testing-library/react';
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
import { selectErrorState } from '../../shared';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');
jest.mock('../../shared/CancelButton');
jest.mock('../../shared/Hint');
jest.mock('../../service');

const drawStaticOvalSpy = jest.spyOn(ServiceModule, 'drawStaticOval');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);
const mockUseMediaStreamInVideo = getMockedFunction(useMediaStreamInVideo);

// Mock navigator.mediaDevices.getUserMedia
const mockGetUserMedia = jest.fn();
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: mockGetUserMedia,
  },
  writable: true,
});

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

  const mockVideoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user',
  };

  const mockSelectableDevices = [
    { deviceId: 'device-1', label: 'Camera 1' },
    { deviceId: 'device-2', label: 'Camera 2' },
    { deviceId: 'device-3', label: 'Camera 3' },
  ];

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

    act(() => {
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
    act(() => {
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
    act(() => {
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
    act(() => {
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
    act(() => {
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
    act(() => {
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
    act(() => {
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
    act(() => {
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

  describe('Camera Device Switching', () => {
    beforeEach(() => {
      isStart = true;
      mockStateMatchesAndSelectors();
    });

    it('should render camera selection dropdown when multiple devices are available on desktop', () => {
      // Create a more robust selector mock that handles multiple calls
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      // Should render the camera selection dropdown
      expect(screen.getByLabelText('Camera')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Camera 1')).toBeInTheDocument();

      // Should have all device options
      mockSelectableDevices.forEach((device) => {
        expect(screen.getByText(device.label)).toBeInTheDocument();
      });
    });

    it('should not render camera selection dropdown on mobile screens', () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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

      const videoEl = screen.getByTestId('video');
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      // Should not render camera selection on mobile
      expect(screen.queryByLabelText('Camera')).not.toBeInTheDocument();
    });

    it('should not render camera selection when only one device is available', () => {
      const singleDevice = [{ deviceId: 'device-1', label: 'Camera 1' }];

      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return singleDevice;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      // Should not render camera selection when only one device
      expect(screen.queryByLabelText('Camera')).not.toBeInTheDocument();
    });

    it('should call getUserMedia with correct constraints when camera changes', async () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      const cameraSelect = screen.getByLabelText('Camera');

      // Simulate changing camera to device-2
      fireEvent.change(cameraSelect, { target: { value: 'device-2' } });

      await waitFor(() => {
        expect(mockGetUserMedia).toHaveBeenCalledWith({
          video: {
            ...mockVideoConstraints,
            deviceId: { exact: 'device-2' },
          },
          audio: false,
        });
      });
    });

    it('should dispatch UPDATE_DEVICE_AND_STREAM action when camera changes successfully', async () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      const cameraSelect = screen.getByLabelText('Camera');

      // Simulate changing camera to device-2
      fireEvent.change(cameraSelect, { target: { value: 'device-2' } });

      await waitFor(() => {
        expect(mockActorSend).toHaveBeenCalledWith({
          type: 'UPDATE_DEVICE_AND_STREAM',
          data: {
            newDeviceId: 'device-2',
            newStream: mockMediaStream,
          },
        });
      });
    });

    it('should call getUserMedia when camera changes and handle async operations', async () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-1';
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      const cameraSelect = screen.getByLabelText('Camera');

      // Simulate changing camera to device-2
      fireEvent.change(cameraSelect, { target: { value: 'device-2' } });

      // Should attempt to call getUserMedia with correct constraints
      await waitFor(() => {
        expect(mockGetUserMedia).toHaveBeenCalledWith({
          video: {
            ...mockVideoConstraints,
            deviceId: { exact: 'device-2' },
          },
          audio: false,
        });
      });

      // The component should remain functional
      expect(screen.getByLabelText('Camera')).toBeInTheDocument();
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });

    it('should update device when selectedDeviceId changes via useEffect', async () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'device-2'; // selectedDeviceId changed
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      await waitFor(() => {
        expect(mockGetUserMedia).toHaveBeenCalledWith({
          video: {
            ...mockVideoConstraints,
            deviceId: { exact: 'device-2' },
          },
          audio: false,
        });
      });

      await waitFor(() => {
        expect(mockActorSend).toHaveBeenCalledWith({
          type: 'UPDATE_DEVICE_AND_STREAM',
          data: {
            newDeviceId: 'device-2',
            newStream: mockMediaStream,
          },
        });
      });
    });

    it('should not attempt camera change when selectedDeviceId is not found in selectableDevices', async () => {
      mockUseLivenessSelector.mockImplementation((selector) => {
        if (selector === selectVideoStream) return mockMediaStream;
        if (selector === selectVideoConstraints) return mockVideoConstraints;
        if (selector === selectSelectedDeviceId) return 'non-existent-device'; // Device not in selectableDevices
        if (selector === selectSelectableDevices) return mockSelectableDevices;
        if (selector === selectFaceMatchPercentage) return 25;
        if (selector === selectFaceMatchState)
          return FaceMatchState.FACE_IDENTIFIED;
        if (selector === selectErrorState) return null;
        return undefined;
      });

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
      act(() => {
        videoEl.dispatchEvent(new Event('canplay'));
      });

      // Should not call getUserMedia or send UPDATE_DEVICE_AND_STREAM for non-existent device
      await waitFor(
        () => {
          expect(mockGetUserMedia).not.toHaveBeenCalled();
          expect(mockActorSend).not.toHaveBeenCalledWith({
            type: 'UPDATE_DEVICE_AND_STREAM',
            data: expect.any(Object),
          });
        },
        { timeout: 1000 }
      );
    });
  });
});
