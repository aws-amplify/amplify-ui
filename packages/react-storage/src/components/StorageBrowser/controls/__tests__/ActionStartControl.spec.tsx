import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionStartControl } from '../ActionStartControl';
import { useActionStart } from '../hooks/useActionStart';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionStart');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/ActionStart', () => ({
  ActionStart: () => <div data-testid="action-start" />,
}));

describe('ActionStartControl', () => {
  const mockUseActionStart = jest.mocked(useActionStart);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionStart.mockClear();
  });

  it('renders', () => {
    render(<ActionStartControl />);

    const actionStart = screen.getByTestId('action-start');

    expect(actionStart).toBeInTheDocument();
  });
});
