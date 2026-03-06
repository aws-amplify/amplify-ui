import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitleControl } from '../TitleControl';
import { useTitle } from '../hooks/useTitle';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useTitle');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/Title', () => ({
  Title: () => <div data-testid="title" />,
}));

describe('TitleControl', () => {
  const mockUseTitle = jest.mocked(useTitle);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseTitle.mockClear();
  });

  it('renders', () => {
    render(<TitleControl />);

    const title = screen.getByTestId('title');

    expect(title).toBeInTheDocument();
  });
});
