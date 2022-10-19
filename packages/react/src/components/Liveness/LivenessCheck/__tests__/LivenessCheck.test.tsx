import * as React from 'react';
import { screen } from '@testing-library/react';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../utils/test-utils';
import { useThemeBreakpoint } from '../../../../hooks/useThemeBreakpoint';
import { LivenessCheck } from '../LivenessCheck';
import { useLivenessSelector, useLivenessActor } from '../../hooks';
import { LivenessErrorState } from '@aws-amplify/ui';

jest.mock('../../hooks');
jest.mock('../../../../hooks/useThemeBreakpoint');
jest.mock('../../shared/CancelButton');
jest.mock('../LivenessCameraModule');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseThemeBreakpoint = getMockedFunction(useThemeBreakpoint);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

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

    renderWithLivenessProvider(<LivenessCheck />);

    expect(
      screen.getByRole('button', { name: 'Cancel Liveness check' })
    ).toBeInTheDocument();
    expect(screen.getByText('Camera not accessible')).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should render the component content on desktop when no 15 fps camera is found', () => {
    mockActorState.matches.mockReturnValue(true);
    mockUseLivenessSelector.mockReturnValue(
      LivenessErrorState.CAMERA_FRAMERATE_ERROR
    );

    renderWithLivenessProvider(<LivenessCheck />);

    expect(
      screen.getByRole('button', { name: 'Cancel Liveness check' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('No camera detected with 15 fps')
    ).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should render the component content on mobile with permissionDenied false', () => {
    mockActorState.matches.mockReturnValue(false);
    mockUseThemeBreakpoint.mockReturnValue('base');

    renderWithLivenessProvider(<LivenessCheck />);

    expect(screen.queryByText('Camera not accessible')).not.toBeInTheDocument();
    expect(screen.getByText('LivenessCameraModule')).toBeInTheDocument();
  });
});
