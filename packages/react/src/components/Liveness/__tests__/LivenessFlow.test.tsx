import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useActor } from '@xstate/react';

import { FaceLivenessDetector, FaceLivenessDetectorProps } from '..';
import { getMockedFunction, mockMatchMedia } from '../utils/test-utils';
import { getVideoConstraints } from '../StartLiveness/helpers';
import { useMediaStreamInVideo, useLivenessActor } from '../hooks';

jest.mock('../../../styles.css', () => ({}));
jest.mock('@xstate/react');
jest.mock('../StartLiveness/helpers');
jest.mock('../hooks');

const mockUseActor = getMockedFunction(useActor);
const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockGetVideoConstraints = getMockedFunction(getVideoConstraints);
const mockUseMediaStreamInVideo = getMockedFunction(useMediaStreamInVideo);
const mockMatches = jest.fn().mockImplementation(() => {
  return true;
});

describe('FaceLivenessDetector', () => {
  const mockActorState: any = {
    matches: mockMatches,
  };
  const mockActorSend = jest.fn();

  mockUseActor.mockReturnValue([mockActorState, mockActorSend]);
  mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  mockUseMediaStreamInVideo.mockReturnValue({
    videoRef: { current: document.createElement('video') },
    videoHeight: 100,
    videoWidth: 100,
  });

  const mockVideoConstraints = {};
  mockGetVideoConstraints.mockReturnValue(mockVideoConstraints);
  mockMatches.mockReturnValue(false);

  const defaultProps: FaceLivenessDetectorProps = {
    sessionId: 'sessionId',
    handleGetLivenessDetection: async () => {},
  };
  const livenessTestId = 'liveness-detector';
  const livenessCheckTestId = 'liveness-detector-check';

  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the flow by default', () => {
    render(<FaceLivenessDetector {...defaultProps} />);
    expect(screen.getByTestId(livenessTestId)).toBeInTheDocument();
  });

  /**
   * TODO: Update these to work with new disableStartScreenProp
   * since we've removed the Cancel button on the start screen
   * 
  it('should call the onUserCancel and onExit props on user cancel', () => {
    const onUserCancel = jest.fn();
    const onExit = jest.fn();

    render(
      <LivenessFlow
        {...defaultProps}
        onUserCancel={onUserCancel}
        onExit={onExit}
      />
    );

    userEvent.click(screen.getByRole('button', { name: cancelButtonName }));
    expect(onUserCancel).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('should not call onExit prop if the default is prevented in onUserCancel', () => {
    const onUserCancel = jest.fn((event: CustomEvent) => {
      event.preventDefault();
    });
    const onExit = jest.fn();

    render(
      <LivenessFlow
        {...defaultProps}
        onUserCancel={onUserCancel}
        onExit={onExit}
      />
    );

    userEvent.click(screen.getByRole('button', { name: cancelButtonName }));
    expect(onUserCancel).toHaveBeenCalledTimes(1);
    expect(onExit).not.toHaveBeenCalled();
  });
  */

  it('should show the check screen if disableStartScreen is true', () => {
    render(
      <FaceLivenessDetector {...defaultProps} disableStartScreen={true} />
    );
    expect(screen.queryByTestId(livenessCheckTestId)).toBeInTheDocument();
  });

  it('should not show the instruction if disableStartScreen is true and xstate is at the start', async () => {
    mockMatches.mockReturnValueOnce(true);
    render(
      <FaceLivenessDetector {...defaultProps} disableStartScreen={true} />
    );

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'BEGIN',
      data: { videoConstraints: {} },
    });
  });
});
