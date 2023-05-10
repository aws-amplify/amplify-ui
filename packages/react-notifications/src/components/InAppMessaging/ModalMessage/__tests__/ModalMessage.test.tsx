import * as React from 'react';
import { render, screen } from '@testing-library/react';

import * as UiReactModule from '@aws-amplify/ui-react';
import { useMessageProps } from '../../hooks';
import { DIALOG_CLASS } from '../constants';
import { ModalMessage } from '../ModalMessage';
import { ModalMessageProps } from '../types';

jest.mock('../../hooks/');
jest.mock('../../MessageLayout', () => ({
  MessageLayout: () => 'MessageLayout',
}));

const TEST_PROPS: ModalMessageProps = { layout: 'MODAL' };

const mockUseMessageProps = useMessageProps as jest.Mock;

const useBreakpointValueSpy = jest.spyOn(UiReactModule, 'useBreakpointValue');

describe('ModalMessage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMessageProps.mockReturnValue({
      shouldRenderMessage: true,
    });
    useBreakpointValueSpy.mockReturnValue(false);
  });

  it('should render', () => {
    // mockUseMessageProps.mockReturnValue({
    //   shouldRenderMessage: true,
    // });

    render(<ModalMessage {...TEST_PROPS} />);

    const modalMessage = screen.queryByRole('dialog');
    expect(modalMessage).toBeInTheDocument();
    expect(modalMessage).toHaveClass(DIALOG_CLASS);
  });

  it('should render with full-width modifier', () => {
    useBreakpointValueSpy.mockReturnValue(true);
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
