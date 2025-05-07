import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddFolder } from '../AddFolder';

describe('AddFolder', () => {
  const label = 'add-folder-label';
  const mockOnAddFolder = jest.fn();

  afterEach(() => {
    mockOnAddFolder.mockClear();
  });

  it('renders', () => {
    render(<AddFolder label={label} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
  });

  it('can be disabled', () => {
    render(<AddFolder isDisabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('calls onToggle', () => {
    render(<AddFolder onAddFolder={mockOnAddFolder} />);

    const button = screen.getByRole('button');
    button.click();

    expect(mockOnAddFolder).toHaveBeenCalled();
  });
});
