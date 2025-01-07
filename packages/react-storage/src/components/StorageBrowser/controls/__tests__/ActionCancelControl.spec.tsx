import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancelControl } from '../ActionCancelControl';
import { useActionCancel } from '../hooks/useActionCancel';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionCancel');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/ActionCancel', () => ({
  ActionCancel: () => <div data-testid="action-cancel" />,
}));

describe('ActionCancelControl', () => {
  const mockUseActionCancel = jest.mocked(useActionCancel);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionCancel.mockClear();
  });

  it('renders', () => {
    render(<ActionCancelControl />);

    const actionCancel = screen.getByTestId('action-cancel');

    expect(actionCancel).toBeInTheDocument();
  });
});
