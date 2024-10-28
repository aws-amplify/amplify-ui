import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginateButton } from '../PaginateButton';

describe('PaginateButton', () => {
  it('renders "next" button', () => {
    render(<PaginateButton disabled={false} onClick={jest.fn()} type="next" />);

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    const nextIcon = nextButton.querySelector('svg');

    expect(nextButton).toBeInTheDocument();
    expect(nextIcon).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders "previous" button', () => {
    render(
      <PaginateButton disabled={false} onClick={jest.fn()} type="previous" />
    );

    const previousButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    const previousIcon = previousButton.querySelector('svg');

    expect(previousButton).toBeInTheDocument();
    expect(previousIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
