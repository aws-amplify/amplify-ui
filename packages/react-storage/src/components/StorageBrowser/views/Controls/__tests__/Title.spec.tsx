import React from 'react';
import { render, screen } from '@testing-library/react';
import { TitleControl } from '../Title';

describe('TitleControl', () => {
  it('renders the TitleControl', () => {
    render(<TitleControl />);

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
  });
});
