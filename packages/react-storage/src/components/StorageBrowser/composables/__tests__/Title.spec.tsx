import React from 'react';
import { render, screen } from '@testing-library/react';
import { Title } from '../Title';
import { CLASS_BASE } from '../../views/constants';

describe('Title', () => {
  it('renders and has the given classname', () => {
    const expectedTitle = 'StorageBrowser';
    const BLOCK_NAME = `${CLASS_BASE}__title`;

    render(<Title title={expectedTitle} />);

    const [renderedTitle] = screen.getAllByRole('heading');

    expect(renderedTitle).toHaveTextContent('StorageBrowser');
    expect(renderedTitle).toHaveClass(BLOCK_NAME);
  });
});
