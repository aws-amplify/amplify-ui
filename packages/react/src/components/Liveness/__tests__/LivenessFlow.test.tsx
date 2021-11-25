import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LivenessFlow, LivenessFlowProps } from '..';

jest.mock('../../../styles.css', () => ({}));

describe('LivenessFlow', () => {
  const defaultProps: LivenessFlowProps = {
    sessionId: 'sessionId',
    clientActionDocument: 'clientActionDocument',
    onGetLivenessDetection: async () => {
      return { isLive: true };
    },
  };
  const livenessFlowTestId = 'liveness-flow';
  const cancelButtonName = 'Cancel';

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

  it('should render nothin on user cancel', () => {
    render(<LivenessFlow {...defaultProps} />);
    expect(screen.getByTestId(livenessFlowTestId)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: cancelButtonName }));
    expect(screen.queryByTestId(livenessFlowTestId)).not.toBeInTheDocument();
  });

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
});
