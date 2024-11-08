import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('renders the Pagination composable', async () => {
    render(
      <Pagination
        page={1}
        hasMorePages
        onPaginate={jest.fn()}
        highestPageVisited={10}
      />
    );

    const nav = screen.getByRole('navigation', {
      name: 'Pagination',
    });
    const list = screen.getByRole('list');
    const listItems = await screen.findAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    const nextIcon = nextButton.querySelector('svg');
    const prevIcon = nextButton.querySelector('svg');
    const page = screen.getByText('1');

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
    expect(prevIcon).toBeInTheDocument();
    expect(page).toBeInTheDocument();
    expect(nextIcon).toHaveAttribute('aria-hidden', 'true');
    expect(prevIcon).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });

  it('disables next button when on last page', () => {
    render(
      <Pagination
        page={10}
        hasMorePages={false}
        onPaginate={jest.fn()}
        highestPageVisited={10}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    expect(nextButton).toBeDisabled();
  });

  it('disables prev button when on first page', () => {
    render(
      <Pagination
        page={1}
        hasMorePages
        onPaginate={jest.fn()}
        highestPageVisited={10}
      />
    );

    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    expect(prevButton).toBeDisabled();
  });

  it('calls onPaginate when next button is clicked', () => {
    const onPaginate = jest.fn();
    render(
      <Pagination
        page={1}
        hasMorePages
        onPaginate={onPaginate}
        highestPageVisited={10}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    nextButton.click();
    expect(onPaginate).toHaveBeenCalledWith(2);
  });

  it('calls onPaginate when previous button is clicked', () => {
    const onPaginate = jest.fn();
    render(
      <Pagination
        page={2}
        hasMorePages
        onPaginate={onPaginate}
        highestPageVisited={10}
      />
    );

    const nextButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    nextButton.click();
    expect(onPaginate).toHaveBeenCalledWith(1);
  });
});
