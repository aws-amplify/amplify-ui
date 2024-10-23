import React from 'react';
import { render, screen } from '@testing-library/react';
import { resolveComposable } from '../resolveComposable';
import { useTitle } from '../hooks/useTitle';
import { TitleControl } from '../TitleControl';
import { CLASS_BASE } from '../../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__title`;

jest.mock('../hooks/useTitle');
jest.mock('../resolveComposable');

describe('TitleControl', () => {
  // assert mocks
  const mockUseTitle = useTitle as jest.Mock;
  const mockResolveComposable = resolveComposable as jest.Mock;

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
        children: 'Amplify',
        titleClassName: BLOCK_NAME,
      },
    });

    render(<TitleControl />);

    const [renderedTitle] = screen.getAllByRole('heading');

    expect(renderedTitle).toHaveTextContent('Amplify');
    expect(renderedTitle).toHaveClass(BLOCK_NAME);
  });
});
