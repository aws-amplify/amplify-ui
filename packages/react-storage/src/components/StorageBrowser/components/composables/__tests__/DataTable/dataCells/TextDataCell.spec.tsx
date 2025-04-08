import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextDataCell } from '../../../DataTable/dataCells/TextDataCell';

describe('TextDataCell', () => {
  it('renders', () => {
    render(<TextDataCell content={{ text: 'data-cell-text' }} />);

    const textDataCell = screen.getByText('data-cell-text');

    expect(textDataCell).toBeInTheDocument();
  });

  it('renders with an icon', () => {
    const { container } = render(
      <TextDataCell content={{ icon: 'info', text: 'data-cell-text' }} />
    );

    const textDataCell = screen.getByText('data-cell-text');
    const svg = container.querySelector('svg');

    expect(textDataCell).toBeInTheDocument();
    expect(textDataCell).toHaveAttribute('title', 'data-cell-text');
    expect(svg).toBeInTheDocument();
  });

  it('renders with only an icon', () => {
    const { container } = render(<TextDataCell content={{ icon: 'info' }} />);

    const svg = container.querySelector('svg');

    expect(svg?.parentElement).toHaveTextContent('');
    expect(svg).toBeInTheDocument();
  });
});
