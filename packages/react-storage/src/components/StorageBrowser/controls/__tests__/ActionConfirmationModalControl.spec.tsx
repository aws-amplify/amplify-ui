import React from 'react';
import { render, screen } from '@testing-library/react';

import { useActionConfirmationModal } from '../hooks/useActionConfirmationModal';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

import { ActionConfirmationModalControl } from '../ActionConfirmationModalControl';

jest.mock('../hooks/useActionConfirmationModal');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/ActionConfirmationModal', () => ({
  ActionConfirmationModal: () => (
    <div data-testid="action-confirmation-modal" />
  ),
}));

describe('ActionConfirmationModalControl', () => {
  const mockUseActionConfirmationModal = jest.mocked(
    useActionConfirmationModal
  );
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionConfirmationModal.mockClear();
  });

  it('renders', () => {
    render(<ActionConfirmationModalControl />);

    const modal = screen.getByTestId('action-confirmation-modal');

    expect(modal).toBeInTheDocument();
  });
});
