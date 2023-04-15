import * as React from 'react';
import { screen } from '@testing-library/react';
import { useThemeBreakpoint } from '@aws-amplify/ui-react/internal';

import { LivenessErrorState } from '../../service';
import { renderWithLivenessProvider, getMockedFunction } from '../../__mocks__';
import { LivenessCheck } from '../LivenessCheck';
import { useLivenessSelector, useLivenessActor } from '../../hooks';
import { getDisplayText } from '../../utils/getDisplayText';
import { defaultErrorDisplayText } from '../../displayText';
import { mockMatchMedia } from '../../__mocks__';

jest.mock('../../hooks');
jest.mock('@aws-amplify/ui-react/internal');
jest.mock('../../shared/CancelButton');
jest.mock('../LivenessCameraModule');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseThemeBreakpoint = getMockedFunction(useThemeBreakpoint);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

const {
  landscapeHeaderText,
  landscapeMessageText
} = defaultErrorDisplayText;

const { hintDisplayText, cameraDisplayText, streamDisplayText, errorDisplayText } =
  getDisplayText(undefined);

const {
  cameraMinSpecificationsHeadingText,
  cameraMinSpecificationsMessageText,
  cameraNotFoundHeadingText,
  cameraNotFoundMessageText,
  retryCameraPermissionsText,
} = cameraDisplayText;

const { cancelLivenessCheckText } = streamDisplayText;

describe('LivenessCheck', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
    mockUseThemeBreakpoint.mockReturnValue('small');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component content on desktop with permissionDenied true', () => {
    mockActorState.matches.mockReturnValue(true);

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    expect(
      screen.getByRole('button', {
        name: cancelLivenessCheckText,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(cameraNotFoundHeadingText)).toBeInTheDocument();
    expect(screen.getByText(cameraNotFoundMessageText)).toBeInTheDocument();
    expect(screen.getByText(retryCameraPermissionsText)).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should render the component content on desktop when no 15 fps camera is found', () => {
    mockActorState.matches.mockReturnValue(true);
    mockUseLivenessSelector.mockReturnValue(
      LivenessErrorState.CAMERA_FRAMERATE_ERROR
    );

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    expect(
      screen.getByRole('button', {
        name: cancelLivenessCheckText,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(cameraMinSpecificationsHeadingText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(cameraMinSpecificationsMessageText)
    ).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should render the component content on mobile with permissionDenied false', () => {
    mockActorState.matches.mockReturnValue(false);
    mockUseThemeBreakpoint.mockReturnValue('base');

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    expect(
      screen.queryByText(cameraNotFoundHeadingText)
    ).not.toBeInTheDocument();
    expect(screen.getByText('LivenessCameraModule')).toBeInTheDocument();
  });

  it('should render the component content for mobile landscape errors', () => {
    mockMatchMedia('(orientation: landscape)', true);
    mockActorState.matches.mockReturnValue(true);
    mockUseLivenessSelector.mockReturnValue(
      LivenessErrorState.MOBILE_LANDSCAPE_ERROR
    );

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
      />
    );

    expect(screen.getByText(landscapeHeaderText)).toBeInTheDocument();
    expect(screen.getByText(landscapeMessageText)).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });
});
