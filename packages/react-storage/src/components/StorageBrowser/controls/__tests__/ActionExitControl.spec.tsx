import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionExitControl } from '../ActionExitControl';
import { useActionExit } from '../hooks/useActionExit';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionExit');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/ActionExit', () => ({
  ActionExit: () => <div data-testid="action-exit" />,
}));

describe('ActionExitControl', () => {
  const mockUseActionExit = jest.mocked(useActionExit);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionExit.mockClear();
  });

  it('renders', () => {
    render(<ActionExitControl />);

    const actionExit = screen.getByTestId('action-exit');

    expect(actionExit).toBeInTheDocument();
  });
});
