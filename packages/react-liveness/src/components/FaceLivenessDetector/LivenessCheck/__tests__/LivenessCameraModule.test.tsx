import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { when, resetAllWhenMocks } from 'jest-when';
import { LivenessClassNames } from '../../types/classNames';

import {
  renderWithLivenessProvider,
  getMockedFunction,
  mockMatchMedia,
} from '../../__mocks__';
import {
  useLivenessActor,
  useLivenessSelector,
  useMediaStreamInVideo,
} from '../../hooks';
import {
  LivenessCameraModule,
  selectVideoConstraints,
  selectVideoStream,
} from '../LivenessCameraModule';
import { FaceMatchState } from '../../service';
import { getDisplayText } from '../../utils/getDisplayText';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');
jest.mock('../../shared/CancelButton');
jest.mock('../../shared/Hint');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);
const mockUseMediaStreamInVideo = getMockedFunction(useMediaStreamInVideo);

describe('LivenessCameraModule', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  let isCheckingCamera = false;
  let isNotRecording = false;
  let isRecording = false;

  const { hintDisplayText, streamDisplayText, errorDisplayText } =
    getDisplayText(undefined);
  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  function mockStateMatchesAndSelectors() {
    when(mockActorState.matches)
      .calledWith('cameraCheck')
      .mockReturnValue(isCheckingCamera)
      .calledWith('notRecording')
      .mockReturnValue(isNotRecording)
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
  });

  afterEach(() => {
    isCheckingCamera = false;
    isNotRecording = false;
    isRecording = false;

    jest.clearAllMocks();
    jest.clearAllTimers();
    resetAllWhenMocks();
  });

  it('should render centered loader when isCheckingCamera true', () => {
    isCheckingCamera = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
  });

  it.skip('should render video and timer when isNotRecording true', async () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={true}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    const videoEl = screen.getByTestId('video');

    expect(screen.getByTestId('centered-loader')).toBeInTheDocument();
    expect(videoEl).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: cancelLivenessCheckText })
    ).toBeInTheDocument();

    videoEl.dispatchEvent(new Event('canplay'));

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

  it('should render recording icon when isRecording true', () => {
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

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

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

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

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

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

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(1);
  });

  it('should not render MatchIndicator when isRecording and faceMatchState is TOO_CLOSE', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.TOO_CLOSE);

    const testId = 'cameraModule';

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(0);
  });

  it('should render MatchIndicator when isRecording and faceMatchState is MATCHED', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.MATCHED);

    const testId = 'cameraModule';

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(1);
  });

  it('should not render MatchIndicator when isRecording and faceMatchState is TOO_MANY', async () => {
    isRecording = true;
    mockStateMatchesAndSelectors();
    mockUseLivenessSelector
      .mockReturnValue(25)
      .mockReturnValue(FaceMatchState.TOO_MANY);

    const testId = 'cameraModule';

    renderWithLivenessProvider(
      <LivenessCameraModule
        isMobileScreen={false}
        isRecordingStopped={false}
        hintDisplayText={hintDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        testId={testId}
      />
    );
    const videoEl = screen.getByTestId('video');
    videoEl.dispatchEvent(new Event('canplay'));

    const cameraModule = await screen.findByTestId(testId);
    const matchIndicator = cameraModule.getElementsByClassName(
      LivenessClassNames.MatchIndicator
    );
    expect(matchIndicator).toHaveLength(0);
  });

  it('should create appropriate selectors', () => {
    const expectedConstraints = { width: 100 };
    const expectedStream = { getTracks: () => [] };

    const state: any = {
      context: {
        videoAssociatedParams: {
          videoConstraints: expectedConstraints,
          videoMediaStream: expectedStream,
        },
      },
    };

    const actualConstraints = selectVideoConstraints(state);
    const actualStream = selectVideoStream(state);

    expect(actualConstraints).toEqual(expectedConstraints);
    expect(actualStream).toEqual(expectedStream);
  });
});
