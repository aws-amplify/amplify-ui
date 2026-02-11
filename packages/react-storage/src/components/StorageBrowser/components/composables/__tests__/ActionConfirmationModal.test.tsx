import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  ActionConfirmationModal,
  ActionConfirmationModalProps,
} from '../ActionConfirmationModal';

describe('ActionConfirmationModal', () => {
  const defaultProps: ActionConfirmationModalProps = {
    isOpen: true,
    title: 'Test Modal',
    message: 'Test message',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<ActionConfirmationModal {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ActionConfirmationModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<ActionConfirmationModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ActionConfirmationModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Escape key is pressed', () => {
    render(<ActionConfirmationModal {...defaultProps} />);

    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { key: 'Escape' });
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when backdrop is clicked', () => {
    render(<ActionConfirmationModal {...defaultProps} />);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('uses custom labels when provided', () => {
    render(
      <ActionConfirmationModal
        {...defaultProps}
        confirmLabel="Delete"
        cancelLabel="Keep"
      />
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('renders custom content when provided', () => {
    const customContent = (
      <div data-testid="custom-content">Custom content</div>
    );
    render(
      <ActionConfirmationModal {...defaultProps} content={customContent} />
    );

    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });
});
