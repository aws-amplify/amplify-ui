import React from 'react';
import { render, screen } from '@testing-library/react';
import { OverwriteToggle } from '../OverwriteToggle';

describe('OverwriteToggle', () => {
  const label = 'overwrite-label';
  const mockOnToggle = jest.fn();

  afterEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders', () => {
    render(<OverwriteToggle label={label} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox.nextSibling).toHaveTextContent(label);
  });

  it('can be disabled', () => {
    render(<OverwriteToggle isDisabled />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();
  });

  it('can be checked', () => {
    render(<OverwriteToggle isOverwritingEnabled onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('calls onToggle', () => {
    render(<OverwriteToggle onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    checkbox.click();

    expect(mockOnToggle).toHaveBeenCalled();
  });
});
