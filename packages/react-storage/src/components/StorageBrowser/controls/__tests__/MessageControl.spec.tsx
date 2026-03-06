import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageControl } from '../MessageControl';
import { useMessage } from '../hooks/useMessage';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useMessage');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/Message', () => ({
  Message: () => <div data-testid="message" />,
}));

describe('MessageControl', () => {
  const mockUseMessage = jest.mocked(useMessage);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseMessage.mockClear();
  });

  it('renders', () => {
    render(<MessageControl />);

    const message = screen.getByTestId('message');

    expect(message).toBeInTheDocument();
  });
});
