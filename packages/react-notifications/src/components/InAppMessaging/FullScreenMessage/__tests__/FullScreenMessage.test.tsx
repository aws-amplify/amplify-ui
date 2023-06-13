import * as React from 'react';
import { render, screen } from '@testing-library/react';
import * as UiReactModule from '@aws-amplify/ui-react';

import { useMessageProps } from '../../hooks';
import { BLOCK_CLASS } from '../constants';
import { FullScreenMessage } from '../FullScreenMessage';
import { FullScreenMessageProps } from '../types';
import { BackdropProps } from '../../Backdrop/types';

jest.mock('../../Backdrop', () => ({
  withBackdrop: (Component: React.FC) => (props: BackdropProps) =>
    <Component {...props} />,
}));
jest.mock('../../hooks/');
jest.mock('../../MessageLayout', () => ({
  MessageLayout: () => 'MessageLayout',
}));

const TEST_PROPS: FullScreenMessageProps = { layout: 'FULL_SCREEN' };

const mockUseMessageProps = useMessageProps as jest.Mock;

const useBreakpointValueSpy = jest.spyOn(UiReactModule, 'useBreakpointValue');

describe('FullScreenMessage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: true,
    });
    useBreakpointValueSpy.mockReturnValue(false);
  });

  it('should render', () => {
    render(<FullScreenMessage {...TEST_PROPS} />);

    const fullScreenMessage = screen.queryByRole('dialog');
    expect(fullScreenMessage).toBeInTheDocument();
    expect(fullScreenMessage).toHaveClass(BLOCK_CLASS);
  });

  it('should render with fullscreen modifier', () => {
    useBreakpointValueSpy.mockReturnValue(true);
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
