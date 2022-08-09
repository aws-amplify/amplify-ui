import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useMessageProps } from '../../hooks';
import { BLOCK_CLASS } from '../constants';
import { FullScreenMessage } from '../FullScreenMessage';
import { FullScreenMessageProps } from '../types';

jest.mock('../../../../hooks/useBreakpointValue');
jest.mock('../../Backdrop', () => ({
  withBackdrop: (Component) => (props) => <Component {...props} />,
}));
jest.mock('../../hooks/');
jest.mock('../../MessageLayout', () => ({
  MessageLayout: () => 'MessageLayout',
}));

const TEST_PROPS: FullScreenMessageProps = { layout: 'FULL_SCREEN' };

const mockUseMessageProps = useMessageProps as jest.Mock;
const mockUseBreakpointValue = useBreakpointValue as jest.Mock;

describe('FullScreenMessage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: true,
    });
    mockUseBreakpointValue.mockReturnValue(false);
  });

  it('should render', () => {
    render(<FullScreenMessage {...TEST_PROPS} />);

    const fullScreenMessage = screen.queryByRole('dialog');
    expect(fullScreenMessage).toBeInTheDocument();
    expect(fullScreenMessage).toHaveClass(BLOCK_CLASS);
  });

  it('should render with fullscreen modifier', () => {
    mockUseBreakpointValue.mockReturnValue(true);
    render(<FullScreenMessage {...TEST_PROPS} />);

    const fullScreenMessage = screen.getByRole('dialog');
    expect(fullScreenMessage).toHaveClass(`${BLOCK_CLASS}--fullscreen`);
  });

  it('returns null when not ready to be rendered', () => {
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: false,
    });

    render(<FullScreenMessage {...TEST_PROPS} />);

    const fullScreenMessage = screen.queryByRole('dialog');
    expect(fullScreenMessage).not.toBeInTheDocument();
  });
});
