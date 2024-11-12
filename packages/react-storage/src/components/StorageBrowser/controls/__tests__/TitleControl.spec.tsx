import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitleControl } from '../TitleControl';
import { CLASS_BASE } from '../../views/constants';
import * as useTitleModule from '../hooks/useTitle';

const BLOCK_NAME = `${CLASS_BASE}__title`;

describe('TitleControl', () => {
  const useTitleSpy = jest.spyOn(useTitleModule, 'useTitle');

  afterEach(() => {
    useTitleSpy.mockReset();
  });

  it('renders', () => {
    useTitleSpy.mockReturnValue({
      title: 'Amplify',
    });

    render(<TitleControl />);

    const [renderedTitle] = screen.getAllByRole('heading');

    expect(renderedTitle).toHaveTextContent('Amplify');
    expect(renderedTitle).toHaveClass(BLOCK_NAME);
  });
});
