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

  it('should render the flow by default without active props', () => {
    render(<LivenessFlow {...defaultProps} />);
    expect(screen.getByTestId(livenessFlowTestId)).toBeInTheDocument();
  });

  it('should respect the value of controllable active prop for rendering', () => {
    const { rerender } = render(
      <LivenessFlow {...defaultProps} active onExit={() => {}} />
    );
    expect(screen.getByTestId(livenessFlowTestId)).toBeInTheDocument();

    rerender(
      <LivenessFlow {...defaultProps} active={false} onExit={() => {}} />
    );
    expect(screen.queryByTestId(livenessFlowTestId)).not.toBeInTheDocument();
  });

  it('should NOT show the check screen if disableStartScreen is true and active is false', () => {
    render(
      <LivenessFlow
        {...defaultProps}
        disableStartScreen={true}
        active={false}
      />
    );
    expect(
      screen.queryByTestId(livenessFlowCheckTestId)
    ).not.toBeInTheDocument();
  });
});
