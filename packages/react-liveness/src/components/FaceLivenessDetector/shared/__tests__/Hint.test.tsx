import * as React from 'react';
import { screen } from '@testing-library/react';
import { when, resetAllWhenMocks } from 'jest-when';

import {
  IlluminationState,
  FaceMatchState,
  LivenessErrorState,
  ErrorState,
} from '../../service';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../__mocks__/utils';
import { useLivenessActor, useLivenessSelector } from '../../hooks';
import {
  Hint,
  selectErrorState,
  selectFaceMatchState,
  selectIlluminationState,
} from '../Hint';
import { getDisplayText } from '../../utils/getDisplayText';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

describe('Hint', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  let errorState: ErrorState | null = null;
  let faceMatchState: FaceMatchState | null = null;
  let illuminationState: IlluminationState | null = null;
  let faceMatchStateBeforeStart: FaceMatchState | null = null;
  let isFaceFarEnoughBeforeRecordingState: boolean | null = null;
  let faceMatchPercentage: number | null = null;

  let isNotRecording = false;
  let isRecording = false;
  let isUploading = false;
  let isCheckSuccessful = false;
  let isCheckFailed = false;
  let isCheckFaceDetectedBeforeStart = false;
  let isCheckFaceDistanceBeforeRecording = false;
  let isWaitingForSessionInfo = false;
  let isFlashingFreshness = false;

  const { hintDisplayText } = getDisplayText(undefined);

  function mockStateMatchesAndSelectors() {
    mockUseLivenessSelector
      .mockReturnValueOnce(errorState)
      .mockReturnValueOnce(faceMatchState)
      .mockReturnValueOnce(illuminationState)
      .mockReturnValueOnce(faceMatchStateBeforeStart)
      .mockReturnValueOnce(isFaceFarEnoughBeforeRecordingState)
      .mockReturnValueOnce(faceMatchPercentage);

    when(mockActorState.matches)
      .calledWith('notRecording')
      .mockReturnValue(isNotRecording)
      .calledWith('recording')
      .mockReturnValue(isRecording)
      .calledWith('uploading')
      .mockReturnValue(isUploading)
      .calledWith('checkSucceeded')
      .mockReturnValue(isCheckSuccessful)
      .calledWith('checkFailed')
      .mockReturnValue(isCheckFailed)
      .calledWith('checkFaceDetectedBeforeStart')
      .mockReturnValue(isCheckFaceDetectedBeforeStart)
      .calledWith('checkFaceDistanceBeforeRecording')
      .mockReturnValue(isCheckFaceDistanceBeforeRecording)
      .calledWith('waitForSessionInfo')
      .mockReturnValue(isWaitingForSessionInfo)
      .calledWith({ recording: 'flashFreshnessColors' })
      .mockReturnValue(isFlashingFreshness);
  }

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    errorState = null;
    faceMatchState = null;
    illuminationState = null;
    faceMatchStateBeforeStart = null;
    isFaceFarEnoughBeforeRecordingState = null;
    faceMatchPercentage = null;

    isNotRecording = false;
    isRecording = false;
    isUploading = false;
    isCheckSuccessful = false;
    isCheckFailed = false;
    isCheckFaceDetectedBeforeStart = false;
    isCheckFaceDistanceBeforeRecording = false;
    isWaitingForSessionInfo = false;
    isFlashingFreshness = false;

    jest.clearAllMocks();
    resetAllWhenMocks();
  });

  it('should render nothing if error', () => {
    errorState = LivenessErrorState.FACE_DISTANCE_ERROR;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.queryByText(hintDisplayText.hintMoveFaceFrontOfCameraText)
    ).not.toBeInTheDocument();
  });

  it('should render nothing if failed', () => {
    isCheckFailed = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.queryByText(hintDisplayText.hintMoveFaceFrontOfCameraText)
    ).not.toBeInTheDocument();
  });

  it('should render hint to move only one face onto camera view if isCheckFaceDetectedBeforeStart is true', () => {
    isCheckFaceDetectedBeforeStart = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintMoveFaceFrontOfCameraText)
    ).toBeInTheDocument();
  });

  it('should render hint to about too many faces faceMatchStateBeforeStart is TOO_MANY', () => {
    isCheckFaceDetectedBeforeStart = true;
    faceMatchStateBeforeStart = FaceMatchState.TOO_MANY;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintTooManyFacesText)
    ).toBeInTheDocument();
  });

  it('should render hint to move face further away if checking face distance before recording is false', () => {
    isCheckFaceDistanceBeforeRecording = true;
    isFaceFarEnoughBeforeRecordingState = false;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintTooCloseText)
    ).toBeInTheDocument();
  });

  it('should render hold face in oval message if flashing freshness colors', () => {
    isFlashingFreshness = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintHoldFaceForFreshnessText)
    ).toBeInTheDocument();
  });

  it('should render not recording state if present', () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintConnectingText)
    ).toBeInTheDocument();
  });

  it('should render uploading state if present', () => {
    isUploading = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintVerifyingText)
    ).toBeInTheDocument();
  });

  it('should not render check succeeded state if present', () => {
    isCheckSuccessful = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(screen.queryByText('Check successful')).not.toBeInTheDocument();
  });

  it('should render illumination state if present', () => {
    illuminationState = IlluminationState.DARK;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.getByText(hintDisplayText.hintIlluminationTooDarkText)
    ).toBeInTheDocument();
  });

  it('should not render illumination state if NORMAL', () => {
    illuminationState = IlluminationState.NORMAL;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    expect(
      screen.queryByText(hintDisplayText.hintIlluminationNormalText)
    ).not.toBeInTheDocument();
  });

  it('should render TOO_FAR text if faceMatchState = TOO_FAR and recording', () => {
    faceMatchState = FaceMatchState.TOO_FAR;
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const textElements = screen.getAllByText(hintDisplayText.hintTooFarText);
    const labelElements = screen.getAllByLabelText(
      hintDisplayText.hintTooFarText
    );
    expect(textElements.length).toBe(2);
    expect(textElements[0]).toBeInTheDocument();
    expect(textElements[1]).toBeInTheDocument();
    expect(labelElements.length).toBe(1);
    expect(labelElements[0]).toBeInTheDocument();
  });

  it('should render a11y messages about percentage matched if above 50', () => {
    faceMatchState = FaceMatchState.TOO_FAR;
    isRecording = true;
    faceMatchPercentage = 51;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const labelElements = screen.getAllByLabelText(
      hintDisplayText.hintMatchIndicatorText
    );
    expect(labelElements.length).toBe(1);
    expect(labelElements[0]).toBeInTheDocument();
  });

  it('should render TOO_FAR text if faceMatchState = OFF_CENTER and recording', () => {
    faceMatchState = FaceMatchState.OFF_CENTER;
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const textElements = screen.getAllByText(hintDisplayText.hintTooFarText);
    const labelElements = screen.getAllByLabelText(
      hintDisplayText.hintFaceOffCenterText
    );
    expect(textElements.length).toBe(1);
    expect(textElements[0]).toBeInTheDocument();
    expect(labelElements.length).toBe(1);
    expect(labelElements[0]).toBeInTheDocument();
  });

  it('should render HOLD_STILL text if faceMatchState = MATCHED and recording', () => {
    faceMatchState = FaceMatchState.MATCHED;
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const textElements = screen.getAllByText(
      hintDisplayText.hintHoldFaceForFreshnessText
    );
    expect(textElements[0]).toBeInTheDocument();
  });

  it('should render TOO_FAR text if faceMatchState = CANT_IDENTIFY and recording', () => {
    faceMatchState = FaceMatchState.CANT_IDENTIFY;
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const textElements = screen.getAllByText(hintDisplayText.hintTooFarText);
    const labelElements = screen.getAllByLabelText(
      hintDisplayText.hintTooFarText
    );
    expect(textElements.length).toBe(2);
    expect(textElements[0]).toBeInTheDocument();
    expect(textElements[1]).toBeInTheDocument();
    expect(labelElements.length).toBe(1);
    expect(labelElements[0]).toBeInTheDocument();
  });

  it('should render TOO_FAR text if faceMatchState = FACE_IDENTIFIED and recording', () => {
    faceMatchState = FaceMatchState.FACE_IDENTIFIED;
    isRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Hint hintDisplayText={hintDisplayText} />);

    const textElements = screen.getAllByText(hintDisplayText.hintTooFarText);
    const labelElements = screen.getAllByLabelText(
      hintDisplayText.hintTooFarText
    );
    expect(textElements.length).toBe(2);
    expect(textElements[0]).toBeInTheDocument();
    expect(textElements[1]).toBeInTheDocument();
    expect(labelElements.length).toBe(1);
    expect(labelElements[0]).toBeInTheDocument();
  });

  it('should create appropriate selectors', () => {
    const expectedErrorState = LivenessErrorState.RUNTIME_ERROR;
    const expectedFaceMatchState = FaceMatchState.OFF_CENTER;
    const expectedIlluminationState = IlluminationState.DARK;

    const state: any = {
      context: {
        errorState: expectedErrorState,
        faceMatchAssociatedParams: {
          faceMatchState: expectedFaceMatchState,
          illuminationState: expectedIlluminationState,
        },
      },
    };

    const actualErrorState = selectErrorState(state);
    const actualFaceMatchState = selectFaceMatchState(state);
    const actualIlluminationState = selectIlluminationState(state);

    expect(actualErrorState).toEqual(expectedErrorState);
    expect(actualFaceMatchState).toEqual(expectedFaceMatchState);
    expect(actualIlluminationState).toEqual(expectedIlluminationState);
  });
});
