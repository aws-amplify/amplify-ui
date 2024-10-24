import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonDataCell } from '../../../DataTable/dataCells/ButtonDataCell';

describe('ButtonDataCell', () => {
  it('renders', () => {
    render(<ButtonDataCell content={{ label: 'data-cell-button' }} />);

    const buttonDataCell = screen.getByRole('button');

    expect(buttonDataCell).toHaveTextContent('data-cell-button');
  });

  it('renders with an icon', () => {
    const { container } = render(
      <ButtonDataCell content={{ icon: 'info', label: 'data-cell-button' }} />
    );

    const buttonDataCell = screen.getByRole('button');
    const svg = container.querySelector('svg');

    expect(buttonDataCell).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
  });

  it('renders with only an icon', () => {
    const { container } = render(<ButtonDataCell content={{ icon: 'info' }} />);

    const svg = container.querySelector('svg');

    expect(svg?.parentElement).toHaveTextContent('');
    expect(svg).toBeInTheDocument();
  });

  it('renders button with aria-label', () => {
    const { container } = render(
      <ButtonDataCell content={{ icon: 'cancel', ariaLabel: 'label' }} />
    );

    const buttonDataCell = screen.getByRole('button');
    const svg = container.querySelector('svg');
    expect(svg?.parentElement).toHaveTextContent('');
    expect(svg).toBeInTheDocument();
    expect(buttonDataCell).toHaveAttribute('aria-label', 'label');
  });

  it('can be clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <ButtonDataCell
        content={{ label: 'data-cell-button', onClick: mockOnClick }}
      />
    );

    const buttonDataCell = screen.getByRole('button');
    buttonDataCell.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
