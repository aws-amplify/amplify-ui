import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionConfirmationModal } from '../ActionConfirmationModal';

describe('ActionConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Modal',
    message: 'Test message',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
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

    fireEvent.keyDown(document, { key: 'Escape' });
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

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<ActionConfirmationModal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('focuses confirm button when opened', () => {
      render(<ActionConfirmationModal {...defaultProps} />);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toHaveFocus();
    });

    it('has proper heading structure', () => {
      render(<ActionConfirmationModal {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveAttribute('id', 'modal-title');
    });
  });

  describe('edge cases', () => {
    it('handles missing onConfirm callback', () => {
      render(
        <ActionConfirmationModal {...defaultProps} onConfirm={undefined} />
      );

      expect(() => {
        fireEvent.click(screen.getByText('Confirm'));
      }).not.toThrow();
    });

    it('handles missing onCancel callback', () => {
      render(
        <ActionConfirmationModal {...defaultProps} onCancel={undefined} />
      );

      expect(() => {
        fireEvent.click(screen.getByText('Cancel'));
        fireEvent.keyDown(document, { key: 'Escape' });
      }).not.toThrow();
    });

    it('renders without message', () => {
      render(<ActionConfirmationModal {...defaultProps} message="" />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });
  });
});
