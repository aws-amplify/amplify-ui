import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancelControl } from '../ActionCancelControl';
import * as useActionCancelModule from '../hooks/useActionCancel';

describe('ActionCancelControl', () => {
  const useActionCancelSpy = jest.spyOn(
    useActionCancelModule,
    'useActionCancel'
  );

  afterEach(() => {
    useActionCancelSpy.mockClear();
  });

  afterAll(() => {
    useActionCancelSpy.mockRestore();
  });

  it('renders', () => {
    useActionCancelSpy.mockReturnValue({
      isDisabled: false,
      onCancel: jest.fn(),
      text: 'Cancel',
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: 'Cancel',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders an icon when text is not available', () => {
    const ariaLabel = 'Cancel file upload';

    useActionCancelSpy.mockReturnValue({
      isDisabled: undefined,
      onCancel: jest.fn(),
      ariaLabel,
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: ariaLabel,
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
