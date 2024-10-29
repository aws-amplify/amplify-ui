import React from 'react';
import { render } from '@testing-library/react';
import { ButtonDataCell } from '../../../DataTable/dataCells/ButtonDataCell';

describe('ButtonDataCell', () => {
  it('renders', () => {
    const { getByRole } = render(
      <ButtonDataCell content={{ label: 'data-cell-button' }} />
    );

    const buttonDataCell = getByRole('button');

    expect(buttonDataCell).toHaveTextContent('data-cell-button');
  });

  it('renders with an icon', () => {
    const { container, getByRole } = render(
      <ButtonDataCell content={{ icon: 'info', label: 'data-cell-button' }} />
    );

    const buttonDataCell = getByRole('button');
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
    const { container, getByRole } = render(
      <ButtonDataCell content={{ icon: 'cancel', ariaLabel: 'label' }} />
    );

    const buttonDataCell = getByRole('button');
    const svg = container.querySelector('svg');
    expect(svg?.parentElement).toHaveTextContent('');
    expect(svg).toBeInTheDocument();
    expect(buttonDataCell).toHaveAttribute('aria-label', 'label');
  });

  it('renders disabled button', () => {
    const { getByRole } = render(
      <ButtonDataCell content={{ label: 'cancel', disabled: true }} />
    );

    const buttonDataCell = getByRole('button');
    expect(buttonDataCell).toBeDisabled();
  });

  it('can be clicked', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <ButtonDataCell
        content={{ label: 'data-cell-button', onClick: mockOnClick }}
      />
    );

    const buttonDataCell = getByRole('button');
    buttonDataCell.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
