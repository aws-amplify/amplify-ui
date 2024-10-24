import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useTitle } from '../hooks/useTitle';
import { TitleControl } from '../TitleControl';
import { CLASS_BASE } from '../../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__title`;

jest.mock('../hooks/useTitle');
jest.mock('../hooks/useResolvedComposable');

describe('TitleControl', () => {
  // assert mocks
  const mockUseTitle = useTitle as jest.Mock;
  const mockResolveComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockResolveComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseTitle.mockReset();
    mockResolveComposable.mockClear();
  });

  it('renders', () => {
    mockUseTitle.mockReturnValue({
      props: {
        title: 'Amplify',
      },
    });

    render(<TitleControl />);

    const [renderedTitle] = screen.getAllByRole('heading');

    expect(renderedTitle).toHaveTextContent('Amplify');
    expect(renderedTitle).toHaveClass(BLOCK_NAME);
  });
});
