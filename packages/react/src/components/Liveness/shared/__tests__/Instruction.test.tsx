import * as React from 'react';
import { screen } from '@testing-library/react';
import { when, resetAllWhenMocks } from 'jest-when';
import {
  IlluminationState,
  IlluminationStateStringMap,
  FaceMatchState,
  FaceMatchStateStringMap,
  LivenessErrorState,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../utils/test-utils';
import { useLivenessActor, useLivenessSelector } from '../../hooks';
import {
  Instruction,
  selectErrorState,
  selectFaceMatchState,
  selectIlluminationState,
} from '../Instruction';

jest.mock('../../hooks');
jest.mock('../../hooks/useLivenessSelector');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

describe('Instruction', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  let errorState: LivenessErrorState = null;
  let faceMatchState: FaceMatchState = null;
  let illuminationState: IlluminationState = null;

  let isNotRecording = false;
  let isUploading = false;
  let isCheckSuccessful = false;
  let isCheckFailed = false;

  function mockStateMatchesAndSelectors() {
    mockUseLivenessSelector
      .mockReturnValueOnce(errorState)
      .mockReturnValueOnce(faceMatchState)
      .mockReturnValueOnce(illuminationState);

    when(mockActorState.matches)
      .calledWith('notRecording')
      .mockReturnValue(isNotRecording)
      .calledWith('uploading')
      .mockReturnValue(isUploading)
      .calledWith('checkSucceeded')
      .mockReturnValue(isCheckSuccessful)
      .calledWith('checkFailed')
      .mockReturnValue(isCheckFailed);
  }

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    errorState = null;
    faceMatchState = null;
    illuminationState = null;

    isNotRecording = false;
    isUploading = false;
    isCheckSuccessful = false;
    isCheckFailed = false;

    jest.clearAllMocks();
    resetAllWhenMocks();
  });

  it('should render errorState if present', () => {
    errorState = LivenessErrorState.RUNTIME_ERROR;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(
      screen.getByText(
        LivenessErrorStateStringMap[LivenessErrorState.RUNTIME_ERROR]
      )
    ).toBeInTheDocument();
  });

  it('should render check failed state if present', () => {
    isCheckFailed = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(screen.getByText('Check unsuccessful')).toBeInTheDocument();
  });

  it('should render not recording state if present', () => {
    isNotRecording = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(
      screen.getByText('After countdown, move face to fit in oval')
    ).toBeInTheDocument();
  });

  it('should render uploading state if present', () => {
    isUploading = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(screen.getByText('Verifying...')).toBeInTheDocument();
  });

  it('should render check succeeded state if present', () => {
    isCheckSuccessful = true;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(screen.getByText('Check successful')).toBeInTheDocument();
  });

  it('should render illumination state if present', () => {
    illuminationState = IlluminationState.DARK;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(
      screen.getByText(IlluminationStateStringMap[IlluminationState.DARK])
    ).toBeInTheDocument();
  });

  it('should not render illumination state if NORMAL', () => {
    illuminationState = IlluminationState.NORMAL;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(
      screen.queryByText(IlluminationStateStringMap[IlluminationState.NORMAL])
    ).not.toBeInTheDocument();
  });

  it('should render face match state if present', () => {
    faceMatchState = FaceMatchState.TOO_CLOSE;
    mockStateMatchesAndSelectors();

    renderWithLivenessProvider(<Instruction />);

    expect(
      screen.getByText(FaceMatchStateStringMap[FaceMatchState.TOO_CLOSE])
    ).toBeInTheDocument();
  });

  it('should create appropriate selectors', () => {
    const expectedErrorState = LivenessErrorState.RUNTIME_ERROR;
    const expectedFaceMatchState = FaceMatchState.TOO_CLOSE;
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
