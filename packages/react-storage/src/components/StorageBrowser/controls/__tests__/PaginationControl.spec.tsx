import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginationControl } from '../PaginationControl';
import { ControlsContextProvider } from '../context';
import { ControlsContext } from '../types';

describe('PaginationControl', () => {
  it('renders the PaginationControl', async () => {
    const contextValue: ControlsContext = {
      data: {
        pagination: {
          currentPage: 1,
          disableNext: false,
          disablePrevious: false,
          handlePaginateNext: jest.fn(),
          handlePaginatePrevious: jest.fn(),
        },
      },
      actionsConfig: { type: 'LIST_LOCATIONS', isCancelable: false },
    };

    render(
      <ControlsContextProvider {...contextValue}>
        <PaginationControl />
      </ControlsContextProvider>
    );

    const nav = screen.getByLabelText('Pagination');
    const list = screen.getByRole('list');
    const listItems = await screen.findAllByRole('listitem');
    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    const prevButton = screen.getByRole('button', {
      name: 'Go to previous page',
    });
    const nextIcon = nextButton.querySelector('svg');
    const prevIcon = nextButton.querySelector('svg');

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
    expect(prevIcon).toBeInTheDocument();
    expect(nextIcon).toHaveAttribute('aria-hidden', 'true');
    expect(prevIcon).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
