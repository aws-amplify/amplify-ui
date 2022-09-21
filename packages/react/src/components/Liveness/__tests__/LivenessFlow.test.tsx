import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useActor } from '@xstate/react';

import { LivenessFlow, LivenessFlowProps } from '..';
import { getMockedFunction } from '../utils/test-utils';
import { getVideoConstraints } from '../StartLiveness/helpers';
import { useMediaStreamInVideo, useLivenessActor } from '../hooks';

jest.mock('../../../styles.css', () => ({}));

describe('LivenessFlow', () => {
  const defaultProps: LivenessFlowProps = {
    sessionId: 'sessionId',
    sessionInformation: 'sessionInformation',
    onGetLivenessDetection: async () => {
      return { isLive: true };
    },
  };
  const livenessFlowTestId = 'liveness-detector';
  const livenessFlowCheckTestId = 'liveness-detector-check';
  const cancelButtonName = 'Cancel';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the flow by default', () => {
    render(<LivenessFlow {...defaultProps} />);
    expect(screen.getByTestId(livenessFlowTestId)).toBeInTheDocument();
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

  it('should NOT show the check screen if disableStartScreen is true and active is false', () => {
    render(<LivenessFlow {...defaultProps} disableStartScreen={true} />);
    expect(screen.queryByTestId(livenessFlowCheckTestId)).toBeInTheDocument();
  });
});
