import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddFiles } from '../AddFiles';

describe('AddFiles', () => {
  const label = 'add-files-label';
  const mockOnAddFiles = jest.fn();

  afterEach(() => {
    mockOnAddFiles.mockClear();
  });

  it('renders', () => {
    render(<AddFiles label={label} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
  });

  it('can be disabled', () => {
    render(<AddFiles isDisabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('calls onToggle', () => {
    render(<AddFiles onAddFiles={mockOnAddFiles} />);

    const button = screen.getByRole('button');
    button.click();

    expect(mockOnAddFiles).toHaveBeenCalled();
  });
});
