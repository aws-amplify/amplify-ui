import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancelControl } from '../ActionCancelControl';
import * as useActionCancelModule from '../hooks/useActionCancel';

describe('ActionCancelControl', () => {
  const useActionCancelSpy = jest.spyOn(
    useActionCancelModule,
    'useActionCancel'
  );

  beforeEach(() => {
    useActionCancelSpy.mockClear();
  });

  it('renders', () => {
    useActionCancelSpy.mockReturnValue({
      isDisabled: false,
      onCancel: jest.fn(),
      label: 'Cancel',
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: 'Cancel',
    });

    expect(button).toBeInTheDocument();
  });

  it('disables button', () => {
    useActionCancelSpy.mockReturnValue({
      isDisabled: true,
      onCancel: jest.fn(),
      label: 'Cancel',
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: 'Cancel',
    });

    expect(button).toBeDisabled();
  });
});
