import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextHeader } from '../../../DataTable/headers/TextHeader';

describe('TextHeader', () => {
  it('renders', () => {
    render(<TextHeader content={{ text: 'header-text' }} />);

    const textHeader = screen.getByText('Header-text');

    expect(textHeader).toBeInTheDocument();
  });
});
