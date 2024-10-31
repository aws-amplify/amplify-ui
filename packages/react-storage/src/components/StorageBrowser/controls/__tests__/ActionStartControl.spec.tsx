import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionStartControl } from '../ActionStartControl';
import * as useActionStartModule from '../hooks/useActionStart';

describe('ActionStartControl', () => {
  const useActionStartSpy = jest.spyOn(useActionStartModule, 'useActionStart');

  afterEach(() => {
    useActionStartSpy.mockClear();
  });

  it('renders', () => {
    useActionStartSpy.mockReturnValue({
      isDisabled: false,
      onStart: jest.fn(),
      label: 'Start',
    });
    render(<ActionStartControl />);

    const button = screen.getByRole('button', {
      name: 'Start',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    useActionStartSpy.mockReturnValue({
      isDisabled: false,
      onStart: jest.fn(),
      label: 'Custom Label',
    });
    render(<ActionStartControl />);

    const button = screen.getByRole('button', {
      name: 'Custom Label',
    });

    expect(button).toBeInTheDocument();
  });

  it('calls onStart when button is clicked', () => {
    const mockOnStart = jest.fn();
    useActionStartSpy.mockReturnValue({
      isDisabled: false,
      onStart: mockOnStart,
      label: 'Start',
    });
    render(<ActionStartControl />);

    const button = screen.getByRole('button', {
      name: 'Start',
    });

    button.click();

    expect(mockOnStart).toHaveBeenCalled();
  });
});
