import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useMessageProps } from '../../hooks';
import { DIALOG_CLASS } from '../constants';
import { ModalMessage } from '../ModalMessage';
import { ModalMessageProps } from '../types';

jest.mock('../../../../hooks/useBreakpointValue');
jest.mock('../../hooks/');
jest.mock('../../MessageLayout', () => ({
  MessageLayout: () => 'MessageLayout',
}));

const TEST_PROPS: ModalMessageProps = { layout: 'MODAL' };

const mockUseMessageProps = useMessageProps as jest.Mock;
const mockUseBreakpointValue = useBreakpointValue as jest.Mock;

describe('ModalMessage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: true,
    });
    mockUseBreakpointValue.mockReturnValue(false);
  });

  it('should render', () => {
    render(<ModalMessage {...TEST_PROPS} />);

    const modalMessage = screen.queryByRole('dialog');
    expect(modalMessage).toBeInTheDocument();
    expect(modalMessage).toHaveClass(DIALOG_CLASS);
  });

  it('should render with full-width modifier', () => {
    mockUseBreakpointValue.mockReturnValue(true);
    render(<ModalMessage {...TEST_PROPS} />);

    const modalMessage = screen.getByRole('dialog');
    expect(modalMessage).toHaveClass(`${DIALOG_CLASS}--full-width`);
  });

  it('returns null when not ready to be rendered', () => {
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: false,
    });

    render(<ModalMessage {...TEST_PROPS} />);

    const modalMessage = screen.queryByRole('dialog');
    expect(modalMessage).not.toBeInTheDocument();
  });
});
