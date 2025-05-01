import React from 'react';
import { render, screen } from '@testing-library/react';
import { Title } from '../Title';

describe('Title', () => {
  it('renders', () => {
    const expectedTitle = 'StorageBrowser';

    render(<Title title={expectedTitle} />);

    const [renderedTitle] = screen.getAllByRole('heading');

    expect(renderedTitle).toHaveTextContent('StorageBrowser');
  });
});
