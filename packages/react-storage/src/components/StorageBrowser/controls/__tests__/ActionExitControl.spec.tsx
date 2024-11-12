import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionExitControl } from '../ActionExitControl';
import * as UseActionExitModule from '../hooks/useActionExit';

describe('ActionExitControl', () => {
  const useActionExitSpy = jest.spyOn(UseActionExitModule, 'useActionExit');

  beforeEach(() => {
    useActionExitSpy.mockClear();
  });

  it('renders', () => {
    useActionExitSpy.mockReturnValue({
      isDisabled: false,
      onExit: jest.fn(),
      label: 'Exit',
    });
    render(<ActionExitControl />);

    const button = screen.getByRole('button', { name: 'Exit' });

    expect(button).toBeInTheDocument();
  });

  it('disables button', () => {
    useActionExitSpy.mockReturnValue({
      isDisabled: true,
      onExit: jest.fn(),
      label: 'Exit',
    });
    render(<ActionExitControl />);

    const button = screen.getByRole('button', { name: 'Exit' });

    expect(button).toBeDisabled();
  });
});
